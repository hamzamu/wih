/*
 * Post list template helpers
 */
Template.postList.helpers({
    posts: function() {
        return Posts.find(
                {},
                {sort: {stamp: -1}}
            );
        // return Posts.find(author: author, category: category);
    }
});

/*
 * Post template helpers
*/
Template.post.helpers({
    username: function() {
        var userid = this.user;
        var username = Meteor.users.findOne(userid);
        var username = "arthax0r";
        return (username);
    }
});
