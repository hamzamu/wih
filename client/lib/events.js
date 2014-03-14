    /*
     * Use Posts.update(id, {$set: props}, function(error){}
     */

/*
 * Error template triggers
 */
Template.error.events({
    
    /*
     * Change error seen flag to true when dismissed
     */

});

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
     * Submit form in place when enter is pressed in input field
     */
    'keypress #new-post-target': function (e) {
        if (e.which === 13) {
            $("#new-post-form").submit(function(e){return false});
        }
    },

    /*
     * Close new post form when Esc key is pressed
     */
    'keypress #new-post-target': function (e) {
        if (e.which === 27) {
            $("#new-post-rollover-minus").slideUp("", function() {
                $("#new-post-rollover-plus").show();
            });
            $("#new-post-form").slideUp("slow");
        }
    },

    /*
     * Submit form in place when enter is pressed in text area
    */
    'keyup #new-post-content': function (e,t) {
        if (e.which === 13) {
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
        }
        Meteor.call ('postNew', post, function (error) {
            if (error) {
                // This should be sent to site error message
                throwError(error.reason);
                
                if (error.error === 302) {
                    // dupe, redirect to post
                }
            }
        }
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

/*
 * Comment list triggers
 */
Template.comments.events({
    /*
     * Expand & contract comment triggers
     */
    'click .comment-contractor': function (event) {
        $(event.currentTarget).hide();
        $(event.currentTarget).siblings(".comment-expander").show();
        $(event.currentTarget).siblings(".comments-container").slideUp("slow");
    },
    'click .comment-expander': function (event) {
        $(event.currentTarget).hide();
        $(event.currentTarget).siblings(".comment-contractor").show();
        $(event.currentTarget).siblings(".comments-container").slideDown("slow");
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
});


/*
 * New comment triggers
 */
Template.newComment.events({

    /*
     * Contract container when clicking minus sign div
     */
    'click .new-comment-rollover-minus': function (event) {
        $(".new-comment-rollover-minus").slideUp("", function() {
            $(".new-comment-rollover-plus").show();
        });
        $(".new-comment-form").slideUp("slow");
    },
    /*
     * Expand container when clicking plus sign div
     */
    'click .new-comment-rollover-plus': function (event) {
        $(".new-comment-rollover-plus").hide();
        $(".new-comment-rollover-minus").slideDown("slow");
        $(".new-comment-form").slideDown("slow");
        $(".new-comment-form").children(".comment-fieldset").children(".comment-input").focus();
    },
    /*
     * Submit form in place when enter is pressed in input field
     */
    'keyup #new-comment-content': function (e) {
        if (e.which === 13) {
            $("#new-comment-form").submit(function(e){return false});
        }
    },
    /*
     * Close new comment form when Esc key is pressed
     */
    'keyup #new-comment-content': function (e) {
        if (e.which === 27) {
            $("#new-comment-rollover-minus").slideUp("", function() {
                $("#new-comment-rollover-plus").show();
            });
            $("#new-comment-form").slideUp("slow");
        }
    },
    /*
     * Upon submit, process form, clear fields & close new comment
     */
    'submit': function(e) {
        e.preventDefault();
        // Formulate comment values
        var comment = {
            stamp: new Date(),
            userId: Meteor.userId(),
            postId: null,
            comment: $(e.target).find('[name=new-comment]').val(),
            anonymous: $(e.target).find('[name=new-comment-anonymous]').val(),
        }
        // Throw in some error checking
        comment._id = comments.insert(comment);
        // Clear form values
        $("#new-comment").val("");
        $("#new-comment-anonymous").val("");
        // Contract new comment features
        $("#new-comment-rollover-minus").slideUp("", function() {
            $("#new-comment-rollover-plus").show();
        });
        $("#new-comment-form").slideUp("slow");
        // Update comment count
        // Create notification for post owner
        // Prevent page reload
        return false;
    }

});

/*
 * Comment list triggers
 */
Template.comments.events({
    /*
     * Show and hide comment flagger
     */
    'mouseenter .comment-container': function (event) {
        $(event.currentTarget).children(".comment-flag-holder").hide();
        $(event.currentTarget).children(".comment-flag").show();
    },
    'mouseleave .comment-container': function (event) {
        $(event.currentTarget).children(".comment-flag").hide();
        $(event.currentTarget).children(".comment-flag-holder").show();
    },
    /*
     * Flagging comment
     * Insert into hidden collection
     * Hidden for all or just for user
     * Need post id
     *
     */
    'click .comment-flag': function (event) {

    },
});
