/*
 * Comment publications
 */
Meteor.publish('comments', function(id) {
    
    // Only comments for posts appearing on page should be published
    // return Comments.find({}, {limit: 10});
    if (id) {
        return Comments.find({_id: id});
    } else {
        return Comments.find();
    }

});


/*
 * Permissions for Comments
 */
Comments.allow({
    insert: function () {
        // Only for logged in users
        return !! Meteor.user();
    },
    // Use underscore to add a test for non logged in user voting (allow)
    update: requireLogin,
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
    },
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

        if (!Meteor.user()) {
            throw new Meteor.Error (
                401, "Aren't j00 slick b1tzy, try loggin' in"
            );
        }

        if (!commentValues.comment) {
            throw new Meteor.Error (
                422, "Comment cannot be blank"
            );
        }


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
        if (commentId) {
            // Increment post comment count, extra one is a security check
            Posts.update(postId, '', {$inc: {comments: 1}});
            // Create notification
            // Set time until user can post again
        }

        return commentId;

    },
    /*
     * Increment hate count if user is logged in
     */
    hateComment: function (idComment) {

        // Check for login
        if (!Meteor.user()) {
            throw new Meteor.Error (
                401, "Nice try, hax0r.  Now login."
            );
        }
        // Should really check to see if post is valid
        if (!idComment) {
            throw new Meteor.Error (
                422, "You must enter a target for your hatred"
            );
        }
        // Increment hate count
        Comments.update (idComment, {
            $inc: {haters: 1}
        });
    }

});
