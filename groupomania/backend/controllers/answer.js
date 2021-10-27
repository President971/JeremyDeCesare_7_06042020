//Import
let models = require('../models');
let utils = require('../utils/jwtUtils');
const fs = require('fs');


//Création d'un message
exports.create = (req, res) => {
    //identifier qui créé le commentaire
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                let content = req.body.content;
                if ((content == 'null')) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Answer.create({
                        content: content,
                        UserId: user.id,
                        PostId: req.body.postId
                    })
                        .then((newAnswer) => {
                            res.status(201).json(newAnswer)
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));
}

//Afficher les posts sur le mur
exports.listMsg = (req, res) => {
    models.Answer.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(answers => {
            if (answers.length > null) {
                res.status(200).json(answers)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

// Suppression d'un message //
exports.deleteAnswer = (req, res, next) => {
    models.Answer.findOne({ where: { id: req.params.answerId } }) // On trouve l'objet dans la base de données //
        .then((answer) => {
            models.Answer.destroy({ where: { id: req.params.answerId } }) // Méthode //
                .then(() => res.status(200).json({ post: 'Answer supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
