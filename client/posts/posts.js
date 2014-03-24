// Template Variables
Template.post.action = function () {
    return "hates";
};
Template.post.conjunction = function () {
    return "because";
};
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
    return "Smack return to submit.  In fact, do it twice cuz there's a fucking bug.  Deal with it.";
};

/*
 * Post list template helpers
 */
Template.postList.helpers({
});

/*
 * Post template helpers
*/
Template.post.helpers({
    ownPost: function() {
        if (!Meteor.user()) return false;
        p = this.username;
        u = Meteor.user().username;
        if (p == u) {
            return true;
        } else {
            return false;
        }
    },
    date: function() {
        date = moment(this.stamp).fromNow();
        return date;
    }
});

/*
 * Edit in place by converting values to inputs
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
// Move submission functions directly into here
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
        if (!Meteor.user()) {
            errorThrow("Gotta be logged in, sucka");
            // Try Meteor.call('loginbuttontogglefunctionname', params);
            return false;
        }
        var post = {
            stamp: new Date().getTime(),
            username: Meteor.user().username,
            target: $(e.target).find('[name=target]').val().trim(),
            reason: $(e.target).find('[name=reason]').val().trim(),
            anonymous: $('input[name=anonymous]:checked').val(),
            comments: 0,
            flags: 0,
            haters: 0,
        };
        Meteor.call ('postNew', post, function (error) {
            if (error) {
                errorThrow(error.reason);
                if (error.error === 302) {
                    // dupe, redirect to post
                }
            } else {
                // Should be only on success
                $("#new-post-form").find("input[type=text], textarea").val("");
                // Maybe delay this briefly
                $("#new-post-rollover-minus").slideUp("", function() {
                    $("#new-post-rollover-plus").show();
                });
                $("#new-post-form").slideUp("slow");
            }
        });
        // Prevent page reload
        return false;
    }

});

/*
 * Post list triggers
 */
Template.postList.events({
    
/*
     * Make load more div clickable
    'click #posts-load-more': function (event) {
    },
 */

});

/*
 * Post triggers
 */
Template.post.events({
    
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
    /*
     * Edit post
     */
    'click .post-edit': function (event) {

    },
    /*
     * Favorite post
     */
    'click .post-favorite': function (event) {

    },
    /*
     * Expand & contract comment triggers
     */
    'click .comment-contractor': function (event) {
        $(event.currentTarget).hide();
        $(event.currentTarget).siblings(".comment-expander").show();
        $(event.currentTarget).parent().parent().children(".post-comments").children(".comments-container").slideUp("slow");
    },
    'click .comment-expander': function (event) {
        $(event.currentTarget).hide();
        $(event.currentTarget).siblings(".comment-contractor").show();
        $(event.currentTarget).parent().parent().children(".post-comments").children(".comments-container").slideDown("slow");
        /*
            Need to shut all other comment containers
            either here or when expanding another comment
            or all new comment containers here or below

            $(event.currentTarget).parent().siblings.each
                $(event.currentTarget).siblings(".comments-container").slideDown("slow");
        */

        /*
         * Load comments on first expansion
         */
    },
    /*
     * Hate on it
     */
    'click .hate-on-it': function (e) {
        Meteor.call ('hatePost', this._id, function (error) {
            if (error) {
                errorThrow(error.reason);
            }
        });
    },
    /*
     * Tweet it
     */
    //'click .twitter-share-button': function(d,s,id) {
        //var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
        //if(!d.getElementById(id)){
            //js=d.createElement(s);
            //js.id=id;
            //js.src=p+'://platform.twitter.com/widgets.js';
            //fjs.parentNode.insertBefore(js,fjs);
        //}}(document, 'script', 'twitter-wjs');
    //},

});
