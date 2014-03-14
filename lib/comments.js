/*
 * Comments provides:
 *  stamp
 *  userid
 *  postid
 *  comment
 *  hates
 *
 */
Comments = new Meteor.Collection("comments");


Meteor.publish('comments', function() {
    return Comments.find();
});

/*
 * Permissions for Comments
 */
Comments.allow({
    insert: function (userId, doc) {
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! userId;
    },
    update: isOwner,
    update: isAdmin,
    remove: false,

});

/*
 * Denials for Comments
 */
Comments.deny({
    // Deny when callback returns true
    // Limit update fields
    update: function (userId, post, fieldNames) {
        // editable fields list
        return (_.without(fieldNames, 'comment').length > 0);
    }
});
