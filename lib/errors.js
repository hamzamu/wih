/*
 * Errors provides:
 *   message
 */
Errors = new Meteor.Collection("errors");

Meteor.publish('errors', function() {
    // Should check user's specific flags in addition to site flagged
    return Errors.find({
            seen: false
        });
});

/*
 * Allow errors for all
 */
Errors.allow ({
    insert: function(){return true;}
});

/*
 * Throw an error message
 */
throwError = function (message) {
    Errors.insert ({message: message, seen: false})
}

/*
 * Remove error that has been flagged as viewed
 */
clearError = function() {
    // Errors should have an id
    Errors.remove({seen: true});
}

/*
 * Remove errors that have been flagged as viewed
 */
clearErrors = function() {
    Errors.remove({seen: true});
}
