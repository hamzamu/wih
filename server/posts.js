/*
 * Post publications
 */
Meteor.publish('postsAll', function() {
    return Posts.find();
});

Meteor.publish('postSingle', function(id) {
    // Should check user's specific flags in addition to site flagged
    return Posts.find({_id: id});
});

Meteor.publish('posts', function(options) {
    // Should check user's specific flags in addition to site flagged
    return Posts.find({}, options);
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
    insert: function () {
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! Meteor.user();
    },
    // User able to update the comment count by 1 when commenting
    update: function () {
        if (Meteor.user()) return true;
    },
    remove: false,
});

/*
 * Denials for Posts collection
 */
Posts.deny({
    // Deny when callback returns true
    // Limit update fields
    // This is block comment count updates no matter what i do :(
    /*
     *update: function (id, post, fieldNames) {
     *    // Not allowing owner to click own post
     *    if (isOwner (id, post)) {
     *        // editable fields list
     *        return (_.without(fieldNames, 'target', 'reason').length > 0);
     *    } else {
     *        // updating comments, called from server upon successful insert
     *        return post;
     *    }
     *}
     */
});

/*
 * Server side post functions
 */
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

        if (!Meteor.user()) {
            throw new Meteor.Error (
                401, "Nice try, hax0r.  Now login."
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
                   'username',
                   'anonymous',
                   'comments',
                   'flags',
                   'haters'
                   )
               );

        var postId = Posts.insert(post);

        return postId;

    },

    /*
     * Increment hate count if user is logged in
     */
    hatePost: function (idPost) {

        /* Allow non-logged in users.. 
            // Check for login
            if (!Meteor.user()) {
                throw new Meteor.Error (
                    401, "Nice try, hax0r.  Now login."
                );
            }
        */
        // Should really check to see if post is valid
        if (!idPost) {
            throw new Meteor.Error (
                422, "You must enter a target for your hatred"
            );
        }
        // Check user has not voted before

        // Increment hate count
        Posts.update (idPost, {
            $inc: {haters: 1}
        });
    }

});
