//Import
let models = require('../models');
let utils = require('../utils/jwtUtils');
const fs = require('fs');
const answer = require('../models/answer');


//Création d'un message
exports.create = (req, res) => {
    //Declaration de l'url de l'image
    let attachmentURL
    //identifier qui créé le message
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                //Récupération du corps du post
                let title = req.body.title;
                let author = user.username;
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    attachmentURL == null
                };
                if ((title == 'null' && author == 'null' && content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Post.create({
                        title: title,
                        author: author,
                        content: content,
                        attachement: attachmentURL,
                        UserId: user.id
                    })
                        .then((newPost) => {
                            res.status(201).json(newPost)
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
    models.Post.findAll({
        include: ["answers"],
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}

// Suppression d'un message //
exports.deletePost = (req, res, next) => {
    models.Post.findOne({ where: { id: req.params.postId } }) // On trouve l'objet dans la base de données //
        .then((post) => {
            models.Post.destroy({ where: { id: req.params.postId } }) // Méthode //
                .then(() => res.status(200).json({ post: 'Post supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
