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
    ownComment: function() {
        if (!Meteor.user()) return false;
        c = this.username;
        u = Meteor.user().username;
        if (c == u) {
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
 * Comment list template helpers
 */
Template.comments.helpers({
    comments: function() {
        postComments = Comments.find(
                {postId: this._id},
                {sort: {stamp: -1}}
            );
        return postComments;
    },
});

/*
 * Comment list triggers
 */
Template.comments.events({
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
     * Expand container when clicking plus sign div
     */
    'click .hate-on-it': function (e) {
        // $(".new-comment-rollover-plus").hide();
    },
    /*
     * Submit form in place when enter is pressed in input field
     */
    'keypress .comment-fieldset': function (e) {
        if (e.which === 13) {
            // Trigger login/signup box if not logged in
            if (!Meteor.user()) {
                errorThrow("Gotta be logged in ta comment, mannngggzzz");
                // Tried Meteor.call...
                /*
                Accounts.ui.loginButtonsSession.set('dropdownVisible', true);                                                                // 8
                Deps.flush();                                                                                                    // 9
                Accounts.ui.correctDropdownZIndexes();  
                */
                return false;
            }
            var comment = {
                postId: this._id,
                stamp: new Date().getTime(),
                username: Meteor.user().username,
                comment: $('.comment-input').val().trim(),
                anonymous: $('input[name=comment-anonymous]:checked').val(),
                haters: 0,
                flags: 0
            }
            // Throw in some error checking
            if (comment._id = Comments.insert(comment)) {
                // Clear form values * clear checkbox not working
                // Anonymous does not stick after non-anonymous comment :(
                $(".new-comment-form").find("input[type=checkbox], textarea").val("");
                /*
                 * Keeping it open allows more discussion like commenting
                 * // Contract new comment features
                 * $(".new-comment-rollover-minus").slideUp("", function() {
                 *     $(".new-comment-rollover-plus").show();
                 * });
                 */
                $(".new-comment-form").slideUp("slow");
                // Update comment count
                // Increment comment count
                Posts.update (comment.postId, {
                    $inc: {comments: 1}
                });
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
    /*
     * Hate on it
     */
    'click .hate-comment': function (e) {
        e.preventDefault();
        Meteor.call ('hateComment', this._id, function (error) {
            if (error) {
               errorThrow(error.reason);
            }
        });
    }
});
