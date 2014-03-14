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
                   anonymous,
                   )
               );

        var commentId = Comments.insert(comment);

        return commentId;

    }

});

/*
 * FUTURES
 * ..
 * // sets a value to x client side, y in future (server side)
 * title: postValues.target + (this.isSimulation ? x : y),
 * ..
 *
 * if (! this.isSimulation) {
 *  // running client side
 *  var Future = Npm.require('fibers/future');
 *  var future = new Future();
 *  Meteor.setTimeout (function() {
 *   future.return();
 *  }, 5 * 1000);
 *  future.wait()
 * }
 */
