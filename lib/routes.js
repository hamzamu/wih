Router.configure({
    layoutTemplate: 'home',
    waitOn: function() {
        return Meteor.subscribe('posts');
    },
});
// How would we wait on multiple?

Router.map(function() {

    this.route('postList', {
        path: '/',
    });

    // :var turns segment into param 'var'
    this.route('postPage', {
        path: '/posts/:_id',
        data: function() {
            return Posts.findOne(this.params._id);
        },
    });

    /*
     * /:user for user names
     *   - make sure it doesn't match other routes?
     *   - make sure user can't select routes for names
     * /somethingdoesntexist can be a new page?
     *
     */

});

/*
 * Function to check if user is logged in
 */
var requireLogin = function() {
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
 * Pages that require standard login to access
    Router.before(requireLogin, {only: 'x'});
 */

/*
 * Clear errors
 * 
 * TODO:
 *   Make session friendly
 *   This is stupid
 *   Should have the dismiss button clear them
 *     or clear after several seconds
Router.before (function() {
    clearErrors();
});
 */
