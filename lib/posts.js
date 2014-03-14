/*
 * Posts provides:
 *  stamp
 *  user
 *  target
 *  reason
 *  hates
 *
 */
Posts = new Meteor.Collection("posts");

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

/*
 * Permissions for Posts collection
 */
Posts.allow({
    insert: function (userId, doc) {
        // Is this redundant now??
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! userId;
    },
    update: isOwner,
    update: isAdmin,
    remove: false,
});

/*
 * Denials for Posts collection
 */
Posts.deny({
    // Deny when callback returns true
    // Limit update fields
    update: function (userId, post, fieldNames) {
        // editable fields list
        return (_.without(fieldNames, 'target', 'reason').length > 0);
    }
});

