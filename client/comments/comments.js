// This needs to be more selective
Meteor.subscribe('comments');

Template.newComment.promptComment = function () {
    return "Why u hatin':";
};
Template.newComment.noteComment = function () {
    return "This will be tweeted..sooner or later >:o";
};
Template.newComment.promptCommentAnonymous = function () {
    return "Comment anonymously?";
};

/*
 * Comment template helpers
 */
Template.comment.helpers({
    username: function(id) {
        var username = Meteor.users.findOne(id);
        alert(JSON.stringify(userName(id)));
        return (userName(id));
    }
});

/*
 * Comment list template helpers
 */
Template.comments.helpers({
    comments: function() {
        return Comments.find(
                {postId: this._id},
                {sort: {stamp: -1}}
            );
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
    'keypress .comment-fieldset': function (e) {
        if (e.which === 13) {
            var comment = {
                stamp: new Date(),
                userId: Meteor.userId(),
                postId: this._id,
// no worky
                comment: $('.comment-input').val(),
                anonymous: $('.new-comment-anonymous').val(),
                haters: 0,
                flags: 0
            }
            // Throw in some error checking
            if (comment._id = Comments.insert(comment)) {
                // Clear form values
                $(".comment-input").val("");
                $(".new-comment-anonymous").val("");
                // Contract new comment features
                $(".new-comment-rollover-minus").slideUp("", function() {
                    $(".new-comment-rollover-plus").show();
                });
                $(".new-comment-form").slideUp("slow");
                // Update comment count
                // Create notification for post owner
            }
        } else if (e.which === 27) {
// no worky
alert('enter');
            /*
             * Close new comment form when Esc key is pressed
             */
            $(".new-comment-rollover-minus").slideUp("", function() {
                $(".new-comment-rollover-plus").show();
            });
            $(".new-comment-form").slideUp("slow");
        }
    },
    /*
     * Prevent submission
     */
    'submit': function(e) {
        e.preventDefault();
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
