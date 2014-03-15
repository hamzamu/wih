// Subscribing to limited posts
// Meteor.subscribe('posts', author);

// Template Variables
Template.newPost.promptTarget = function () {
    return "What I hate is:";
};
Template.newPost.promptReason = function () {
    return "because:";
};
Template.newPost.promptAnonymous = function () {
    return "Post anonymously?";
};
Template.newPost.noteTarget = function () {
    return "This will be your tweet..when that feature is available >:o";
};
Template.newPost.noteReason = function () {
    return "Smack return to submit";
};

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
    ownPost: function() {
        // Use isOwner?
        if (this.userId && Meteor.userId()) {
            alert(this.userId + "==" + Meteor.userId());
            return this.userId == Meteor.userId();
        } else {
            return false;
        }
    },
    username: function() {
        var userid = this.user;
        var username = Meteor.users.findOne(userid);
        var username = "arthax0r";
        return (username);
    }
});

/*
 * Edit in place by converting values to inputs
 */

    /*
     * Use Posts.update(id, {$set: props}, function(error){}
     */

/*
 * New post triggers
 */
Template.newPost.events({

    /*
     * Contract container when clicking minus sign div
     */
    'click #new-post-rollover-minus': function (event) {
        $("#new-post-rollover-minus").slideUp("", function() {
            $("#new-post-rollover-plus").show();
        });
        $("#new-post-form").slideUp("slow");
    },

    /*
     * Expand container when clicking plus sign div
     */
    'click #new-post-rollover-plus': function (event) {
        $("#new-post-rollover-plus").hide();
        $("#new-post-rollover-minus").slideDown("slow");
        $("#new-post-form").slideDown("slow");
        $("#new-post-target").focus();
    },

    /*
     * Close new post form when Esc key is pressed
     */
    'keyup #new-post-form': function (e) {
        if (e.which === 27) {
            $("#new-post-rollover-minus").slideUp("", function() {
                $("#new-post-rollover-plus").show();
            });
            $("#new-post-form").slideUp("slow");
        }
    },

    /*
     * Submit form in place when enter is pressed in input field
     */
    'keypress #new-post-target': function (e) {
        if (e.which === 13) {
            $("#new-post-form").submit(function(e){return false});
        }
    },

    /*
     * Submit form in place when enter is pressed in text area
    */
    'keypress #new-post-reason': function (e) {
        if (e.which == 13) {
            $("#new-post-target").focus();
            // no worky!
            $("#new-post-form").submit(function(e){return false});
        }
    },

    /*
     * New post submission
     * Retard default action
     *   Check if can be removed by assigning post action to #
     * Populate client side values
     * Trigger server method
     *   Send post to postNew method which returns error
     * Clear form fields
     * Contract new post containers and replace with expansion container
     */
    'submit': function(e) {
        e.preventDefault();
        var post = {
            stamp: new Date(),
            user: Meteor.userId(),
            target: $(e.target).find('[name=target]').val(),
            reason: $(e.target).find('[name=reason]').val(),
            anonymous: $(e.target).find('[name=anonymous]').val(),
            haters: 0,
            comments: 0
        };
        // no worky!
        Meteor.call ('postNew', post, function (error) {
            if (error) {
                // This should be sent to site error message
                throwError(error.reason);
                
                if (error.error === 302) {
                    // dupe, redirect to post
                }
            }
        });
        $("#new-post-form").find("input[type=text], textarea").val("");
        $("#new-post-rollover-minus").slideUp("", function() {
            $("#new-post-rollover-plus").show();
        });
        $("#new-post-form").slideUp("slow");
        // Prevent page reload
        return false;
    }
});

/*
 * Post list triggers
 */
Template.postList.events({
    
    /*
     * Show and hide post flagger
     */
    'mouseenter .post-flag-container': function (event) {
        $(event.currentTarget).children(".post-meta").children(".post-flag").show();
    },
    'mouseleave .post-flag-container': function (event) {
        $(event.currentTarget).children(".post-meta").children(".post-flag").hide();
    },
    /*
     * Flagging post
     * Insert into hidden collection
     * Hidden for all or just for user
     * Need post id
     *
     */
    'click .post-flag': function (event) {

    },
});

