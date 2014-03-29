Template.home.rendered = function() {
    if(!Meteor.user()) {
        $('#login-sign-in-link').replaceWith('<a class="login-link-text" id="login-sign-in-link"><span title="Drop in" class="glyphicon glyphicon-user"></span></a>');
    } else {
        $('#login-name-link').replaceWith('<a class="login-link-text" id="login-name-link"><span title="GTFO" class="glyphicon glyphicon-log-out"></span></a>');
    }
};
