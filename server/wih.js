/*
 * Server side startup
 */
Meteor.startup(function () {

    /*
     * Example data
     */
    
    // Add new users, use insert id

    if (
        (Site.demo == true)
        && (Posts.find().count() === 0) 
    ){

        /*
        This needs to all be reformatted

        userid = Accounts.createUser({
            username: "",
            email: "",
            password: "",
            profile: ""
        }, function(error) {
            throwError(error);
        });
        */

        userid = Accounts.createUser ({
            email : "user1@gmail.com",
            password: "letmein",
            username : "User 1",
        });

        postid = Posts.insert({
            stamp: new Date(),
            username:  "User 1",
            target: "bugs",
            reason: "they taste bad and break things!",
            anonymous: false,
            comments: 0,
            haters: 420,
            flags: 0,
        });

        commentid = Comments.insert({
            postId: postid,
            stamp: new Date(),
            username: "User 1",
            comment: "Comment 1",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

    }

});
