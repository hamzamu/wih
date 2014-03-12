/*
 * New post triggers
 */
Template.newPost.events({

    /*
     * Contract container when mouse leaves form
    'mouseleave #new-post-form': function (event) {
        $("#new-post-form").slideUp("slow");
    },
    */

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
    'keypress #new-post-content': function (e) {
        if (e.which === 13) {
            $("#new-post-form").submit(function(e){return false});
        }
    },
    */

    /*
     * Upon submit, process form, clear fields & close new post
     */
    'submit': function(e) {
        var post = {
            stamp: new Date(),
            user: Meteor.userId(),
            target: $(e.target).find('[name=target]').val(),
            reason: $(e.target).find('[name=reason]').val(),
            anonymous: $(e.target).find('[name=anonymous]').val(),
        }
        post._id = Posts.insert(post);
        // Clear form values
        $("#new-post-form").find("input[type=text], textarea").val("");
        // Go to new post
        // Router.go('postPage', post);
    }
});

// Post flagging rollover triggers
Template.postList.events({
    'mouseenter .post-flag-container': function (event) {
        $(event.currentTarget).children(".post-meta").children(".post-flag").show();
    },
    'mouseleave .post-flag-container': function (event) {
        $(event.currentTarget).children(".post-meta").children(".post-flag").hide();
    },
});

// Expand & contract comment triggers
Template.comments.events({
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

});

// Comment flagging rollover triggers
Template.comments.events({
    'mouseenter .comment-container': function (event) {
        $(event.currentTarget).children(".comment-flag-holder").hide();
        $(event.currentTarget).children(".comment-flag").show();
    },
    'mouseleave .comment-container': function (event) {
        $(event.currentTarget).children(".comment-flag").hide();
        $(event.currentTarget).children(".comment-flag-holder").show();
    },
});
