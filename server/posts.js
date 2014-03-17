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
        // Make sure they don't cheat
        // postValues.user = Meteor.user();
        // comments = 0;
        // haters = 0;

        if (!postValues.user) {
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
            postValues.anonymous = true;
        }

        // Find dupes
        // throw 302 & go to post / use find/count

        // Explain.
        var post = _.extend(
               _.pick(
                   postValues,
                   'target',
                   'reason',
                   'stamp',
                   'user',
                   'anonymous',
                   'comments',
                   'haters'
                   )
               );

        var postId = Posts.insert(post);

        return postId;

    }
});
