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
     */
    postNew: function (postValues) {

        var dupeTarget = false;
        var dupeReason = false;
        var postAnonymous = false;
        var stamp = new Date().getTime();
        var user = Meteor.user();

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

       var post = _.extend(
               _.pick(
                   postAttributes,
                   target,
                   reason,
                   stamp,
                   user.userId,
                   )
               );

       var postId = Posts.insert(post);

       return postId;

    }

});