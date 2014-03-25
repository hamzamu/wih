/*
 * Configure site router
 */
Router.configure({
    layoutTemplate: 'home',
    waitOn: function() {
        return [
            //Meteor.subscribe('stats'),
        ];
    },
});

/*
 * Controller for post listing
 */
PostListController = RouteController.extend({
    template: 'postList',
    increment: +5,
    limit: function() {
        return parseInt(this.params.postLimit) || +this.increment;
    },
    findOptions: function() {
        return {sort: {stamp: -1}, limit: this.limit()};
    },
    waitOn: function() {
        return [
            Meteor.subscribe('posts', this.findOptions()),
            Meteor.subscribe('postsAll'),
            Meteor.subscribe('comments'),
        ];
    },
    postCount: function() {
        // This is going to suck eventually, need to denormalize it
        return Posts.find().count();
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        // Need to correct for exact length limit still showing load
        //  problably by changing to >== or <== lol
        var hasMore = this.postCount() > this.limit();
        // hack
        // var nextPath = this.route.path ({
        var nextPath = '/' + (+this.limit() + +this.increment);
        return {
            posts: this.posts(), nextPath: hasMore ? nextPath : null
        };
    }
});

/*
 * URL Mapping
 */
Router.map(function() {

    this.route('contact', {
        path: '/contact',
    }),

    this.route('donate', {
        path: '/donate',
    }),

    this.route('search', {
        path: '/search',
    }),

    this.route('help', {
        path: '/help',
    }),

    // :var turns segment into param 'var'
    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('postSingle', this.params._id),
                Meteor.subscribe('comments', this.params._id)
            ];
        },
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
