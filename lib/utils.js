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
