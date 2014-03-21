var defaultPostLimit = 5;

Router.configure({
    layoutTemplate: 'home',
    waitOn: function() {
        return [
            //Meteor.subscribe('posts'),
        ];
    },
});

PostListController = RouteController.extend({
    template: 'postList',
    increment: 5,
    limit: function() {
        return parseInt(this.params.postLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {stamp: -1}, limit: this.limit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        // Need to correct for exact length limit still showing load
        //  problably by changing to >== or <== lol
        var hasMore = this.posts().fetch().length === this.limit();
        var nextPath = this.route.path ({
            limit: this.limit() + this.increment
        });
// no worky! hack
        hasMore = true;
        nextPath = "/99";
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        };
    }
});

Router.map(function() {

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

    this.route('postList', {
        path: '/:postLimit?',
        controller: PostListController,
    });

});

/*
 * Pages that require standard login to access
    Router.before(requireLogin, {only: 'x'});
 */
