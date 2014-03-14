/*
 * Throw an error message
 */
throwError = function (message) {
    Errors.insert ({message: message, seen: false})
}

/*
 * Remove errors that have been flagged as viewed
 */
clearErrors = function() {
    Errors.remove({seen: true});
}
