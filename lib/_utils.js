/*
 * Function to check if user is logged in
 */
requireLogin = function() {
    if (! Meteor.user()) {
        // What about iron-router-progress?
        if (Meteor.loggingIn()) {
            this.render('loadingTemplate');
        } else {
            this.render('accessDenied');
        }
        this.stop();
    }
}

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

