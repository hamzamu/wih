Meteor.methods ({

    /*
     * New post submission
     *
     * Set local vars
     * Check login status
     * Check values from clients
     * Check dupe
     * Prevent extraneous values
     * Insert post
     * Return errors if necessary
     *
     * TODO:
     *  Dupes
     *  Disable submission for X time
     *  Allow editing of posts/comments for X seconds
     *  Racial slur filter
     */
    postNew: function (postValues) {

        var dupeTarget = false;
        var dupeReason = false;
        var postAnonymous = false;
        var stamp = new Date().getTime();
        var user = Meteor.user();
        var comments = 0;
        var haters = 0;

        if (!user) {
            throw new Meteor.Error (
                401, "Gotta be logged in, sucka"
            );
        }

        if (!postValues.target) {
            throw new Meteor.Error (
                422, "You must enter a target for your hatred"
            );
        }

        if (!postValues.reason) {
            throw new Meteor.Error (
                422, "Your hatred must have justification"
            );
        }

        if (postValues.anonymous) {
            postAnonymous = true;
        }

        // Find dupes
        // throw 302 & go to post / use find/count

        // Explain.
        var post = _.extend(
               _.pick(
                   postAttributes,
                   target,
                   reason,
                   stamp,
                   user.userId,
                   comments,
                   haters,
                   )
               );

        var postId = Posts.insert(post);

        return postId;

    }
});
