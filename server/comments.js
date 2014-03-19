/*
 * Comment publications
 */
Meteor.publish('comments', function(c) {
    
    // Only comments for posts appearing on page should be published
    // return Comments.find({}, {limit: 10});
    return Comments.find({});

});


/*
 * Permissions for Comments
 */
Comments.allow({
    insert: function () {
        // Only for logged in users
        return !! Meteor.user();
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

/*
 * Server side comment functions
 */
Meteor.methods ({
    
    /*
     * New comment submission
     *
     * Set local vars
     * Check login status
     * Check values from clients
     * Check dupe
     * Prevent extraneous values
     * Insert comment
     * Return errors if necessary
     *
     * TODO:
     *  Dupes
     *  Disable submission for X time (short!)
     *  Allow editing of posts/comments for X seconds
     *  Associate post id properly
     */
    commentNew: function (commentValues) {

        /*
        var dupe = false;
        var stamp = new Date().getTime();
        var username = Meteor.user().username;
        var postId = null;
        var comment = null;
        var anonymous = false;
        var haters = 0;
        var flags = 0;
        */

        if (!user) {
            throw new Meteor.Error (
                401, "Gotta be logged in, sucka"
            );
        }

        if (!commentValues.comment) {
            throw new Meteor.Error (
                422, "Comment cannot be blank"
            );
        }

        if (commentValues.anonymous) {
            commentAnonymous = true;
        }

        // Find dupes
        // throw 302 & go to comment / use find/count

        // Explain.
        var comment = _.extend(
               _.pick(
                   commentValues,
                   postId,
                   stamp,
                   username,
                   comment,
                   anonymous,
                   haters,
                   flags
                   )
               );

        var commentId = Comments.insert(comment);

        return commentId;

    }

});
