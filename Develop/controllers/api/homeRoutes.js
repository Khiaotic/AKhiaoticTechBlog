const router = require('express').Router();
const {BlogPost, User, Comment} = require ('../models');
const sequelize = require('../config/connection');


router.get('/', withAuth, (req, res)  => {
    BlogPost.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            ' comment_description',
            'created_at'
        ],
        include: [{
            model:  Comment,
            attributes: ['id', 'comment_description','blogPost_id', 'user_id', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
        },
        {
            model: User,
            attributes: ['username']   
        }
    ]
        
    })
    .then(dbPostData => {
        const blogPosts = dbPostData.map(post => post.get({ plain: true}));
    res.render('homepage', { blogPosts, signedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/blogPost/:id', (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes:  [
            'id',
            'comment_description',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_description', 'blogPost_id', 'user_id', 'created_at'],
        includes: {
            model: User,
            attributes: ['username']
        }
        },
    
    {
        model: User,
        attributes: ['username']
    }]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'no post associated with that id'});
            return;
        }
        const blogPost = dbPostData.get({ plain: true});
        console.log(blogPost);
        res.render('singleBlogPost', { blogPost, signedIn: req.session.signedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/blogPost-comments', (req, res) => {
    post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'comment_description',
            'title',
            'created_at'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_description', 'blogPost', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
                attributes: ['username']
        }
    ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'no post associated with that id'});
            return;
        }
        const blogPost  = dbPostData.get({ plain: true});
        res.render('post')
    })
})
