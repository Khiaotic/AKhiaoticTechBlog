
const User = require('./User');

const Comment = require('./Comment');

const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
});
BlogPost.hasMany(Comment, {
    foreignKey: 'blogPost_id',
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
})

////comment belongs to blog post or the user who makes the comment..on the blog post?
Comment.belongsTo(BlogPost, {
    foreignKey: 'blogPost_id'
});

module.exports = {User, Comment, BlogPost}





