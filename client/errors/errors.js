Meteor.subscribe('errors');

/*
 * Errors template helpers
 */
Template.errors.helpers({
    errors: function() {
        // Add check to display only unseen errors
        return Errors.find();
    }
});

/*
 * Error template triggers
 */
Template.error.events({
    
    /*
     * Change error seen flag to true when dismissed
     */

});

