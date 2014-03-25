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

        Accounts.createUser ({
            email : "user1@gmail.com",
            password: "letmein",
            username : "User 1",
        });

        Accounts.createUser ({
            email : "user2@gmail.com",
            password: "letmein",
            username : "User 2",
        });

        Accounts.createUser ({
            email : "user3@gmail.com",
            password: "letmein",
            username : "User 3",
        });

        postid = Posts.insert({
            stamp: new Date().getTime(),
            username:  "User 1",
            target: "bugs",
            reason: "they taste bad and break things!",
            anonymous: false,
            comments: 0,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 2",
            comment: "Comment 1",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 3",
            comment: "Comment 2",
            anonymous: true,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 1",
            comment: "Comment 3",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

        postid = Posts.insert({
            stamp: new Date().getTime(),
            username:  "User 2",
            target: "old news",
            reason: "cuz if it ain't new news it's old news",
            anonymous: false,
            comments: 0,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 1",
            comment: "Comment 4",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 2",
            comment: "Comment 5",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

        postid = Posts.insert({
            stamp: new Date().getTime(),
            username:  "User 3",
            target: "User 1",
            reason: "because he smells bad",
            anonymous: true,
            comments: 0,
            haters: 0,
            flags: 0,
        });

        Comments.insert({
            postId: postid,
            stamp: new Date().getTime(),
            username: "User 1",
            comment: "Comment 6",
            anonymous: false,
            haters: 0,
            flags: 0,
        });

    }

});
