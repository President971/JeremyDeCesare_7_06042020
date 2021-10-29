//Import 
 let models = require('../models');
let utils = require('../utils/jwtUtils');



//Création d'un message
exports.create = (req, res, next) => {
    //identifier qui créé le commentaire
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                let author = user.username;
                let content = req.body.content;
                if ((content == 'null')) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Answer.create({
                        author: author,
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

// Suppression d'un message //
exports.deleteAnswer = (req, res, next) => {
    console.log(req);
    models.Answer.findOne({ where: { id : req.params.answerId } }) // On trouve l'objet dans la base de données //
        .then((answer) => {
            models.Answer.destroy({ where: { id: req.params.answerId } }) // Méthode //
                .then(() => res.status(200).json({ post: 'Answer supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}; 
