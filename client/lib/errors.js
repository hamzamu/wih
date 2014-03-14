/*
 * Errors template helpers
 */
Template.errors.helpers({
    errors: function() {
        // Add check to display only unseen errors
        return Errors.find();
    }
});
