Accounts.ui.config ({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
});

Meteor.startup(function () {
    
    // Assign unique IDs to all post flags
    $(".post-flag").each(function() {
        $(this).uniqueId();
    });

    // Assign unique IDs to comments (may want to do this when they load)
    $(".comment-flag").each(function() {
        $(this).uniqueId();
    });

});
