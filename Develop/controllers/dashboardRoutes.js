const router = require('express').Router();
const {BlogPost, User, Comment} = require ('../models');
const sequelize = require('../config/connection');
const { BlogPost } = require('../models');
const withAuth = require('../utils/auth');



///get get get////
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
    res.render('dashboard', { blogPosts, signedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    BlogPost.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
    'title',
'content',
'created_at'
],
include: [{
    model: User,
    attributes: ['username']
},
{
    model: Comment,
    attributes: ['id', 'comment_description', 'blogPost_id', 'user_id', 'created_at'],
include: {
    model: User,
    attributes: ['username']
}
}
]
})
.then(dbPostData => {
    if(!dbPostData) {
        res.status(404).json({ message: 'no post associated with this id'});
    return;
    }
    const blogPost = dbPostData.get({ plain: true});
    res.render('edit-blogPost', { blogPost, signedIn: true});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
////WHATS WROOOOOOOOOOOOOOOOOOOOOONG WITH THE FUNCTION//////
router.get('/new', req, res) => {
    res.render('newBlogPost')
}

module.exports = router; 
