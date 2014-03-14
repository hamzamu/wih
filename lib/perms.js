/*
 * Check for ownership
 */
isOwner = function (userId, object) {
    return object && object.userId == userId;
}

/*
 * Check for admin
 *
 * TODO:
 *  Make functional
 */
isAdmin = function (userId, object) {
    return false;
}

/*
 * Permissions for Posts collection
 */
Posts.allow({
    insert: function (userId, doc) {
        // Is this redundant now??
        // Only for logged in users
        // Failure should return error / encourage sign up
        return !! userId;
    },
    update: isOwner,
    update: isAdmin,
    remove: false,
});

/*
 * Denials for Posts collection
 */
Posts.deny({
    // Deny when callback returns true
    // Limit update fields
    update: function (userId, post, fieldNames) {
        // editable fields list
        return (_.without(fieldNames, 'target', 'reason').length > 0);
    }
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

