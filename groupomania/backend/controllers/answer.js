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
                        UserId: user.id
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
//Suppression d'une answer
exports.delete = (req, res) => {
    //req => userId, answerId, user.isAdmin
    let userOrder = req.body.userIdOrder;
    //identification du demandeur
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            //Vérification que le demandeur est soit l'admin soit la reponse(vérif aussi sur le front)
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Suppression du answer id :', req.body.answerId);
                models.Answer
                    .findOne({
                        where: { id: req.body.answerId }
                    })
                    .then((answerFind) => {

                        if (answerFind.attachement) {
                            const filename = answerFind.attachement.split('/images/')[1];
                            console.log("teseeeest", filename);
                            fs.unlink(`images/${filename}`, () => {
                                models.Answer
                                    .destroy({
                                        where: { id: answerFind.id }
                                    })
                                    .then(() => res.end())
                                    .catch(err => res.status(500).json(err))
                            })
                        }
                        else {
                            models.Answer
                                .destroy({
                                    where: { id: answerFind.id }
                                })
                                .then(() => res.end())
                                .catch(err => res.status(500).json(err))
                        }
                    })
                    .catch(err => res.status(500).json(err))
            } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
        })
        .catch(error => res.status(500).json(error));
};