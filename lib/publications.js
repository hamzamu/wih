Meteor.publish('comments', function() {
    return Comments.find();
});

/* POSTS */
Meteor.publish('postsAll', function() {
    return Posts.find();
});

Meteor.publish('posts', function(author) {
    // Should check user's specific flags in addition to site flagged
    return Posts.find({
        });
});

Meteor.publish('postsByAuthor', function(author) {
    return Posts.find({
            author: author,
            flagged: false,
        });
});

Meteor.publish('postsFieldSubset', function(author) {
    return Posts.find({},
        {fields: {
            field: value,
            }
        });
});

Meteor.publish('site', function() {
    return Settings.find();
});

Meteor.publish('stats', function() {
    return Stats.find();
});
