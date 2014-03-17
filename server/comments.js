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

        var dupe = false;
        var commentAnonymous = false;
        var stamp = new Date().getTime();
        var user = Meteor.user();
        var postId = null;
        var content = null;
        var haters = 0;

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
                   commentAttributes,
                   stamp,
                   user.userId,
                   content,
                   haters,
                   anonymous
                   )
               );

        var commentId = Comments.insert(comment);

        return commentId;

    }

});
