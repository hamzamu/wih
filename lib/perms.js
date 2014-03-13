/*
 * Check for ownership
 */
isOwner = function (userId, object) {
    return object && object.userId == userId;
}

/*
 * Permissions for creating new posts
 */
Posts.allow({
    insert: function (userId, doc) {
        // Is this redundant now??
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! userId;
    },
    update: isOwner,
    remove: isOwner,
});

/*
 * Permissions for modifying posts
Posts.update({
    update: function (userId, doc) {
        // Only for user who owns it
        return !! userId;
    }
});
 */

/*
 * Permissions for removing posts
Posts.remove({
    remove: function (userId, doc) {
        // Never!!
        return false;
    }
});
 */

/*
 * Limit post editing fields
 */
Posts.deny({
    // Deny when callback returns true
    update: function (userId, post, fieldNames) {
        // editable fields list
        return (_.without(fieldNames, 'target', 'reason').length > 0);
    }
});

/*
 * Permissions for creating new posts
 */
Comments.allow({
    insert: function (userId, doc) {
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! userId;
    }
});

/*
 * Permissions for modifying posts
Comments.update({
    update: function (userId, doc) {
        // Only for user who owns it
        return !! userId;
    }
});
 */

/*
 * Permissions for removing posts
Comments.remove({
    remove: function (userId, doc) {
        // Never!!
        return false;
    }
});
 */
