/*
 * Permissions for creating new posts
 */
Posts.allow({
    insert: function (userId, doc) {
        // Only for logged in users
        return !! userId;
    }
});

/*
 * Permissions for creating new posts
 */
Comments.allow({
    insert: function (userId, doc) {
        // Only for logged in users
        return !! userId;
    }
});
