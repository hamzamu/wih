/*
 * Server side startup
 */
Meteor.startup(function () {

    /*
     * Example data
     */
    if (
        (Site.demo == true)
        && (Posts.find().count() === 0) 
    ){
        postid = Posts.insert({
            stamp: "2014/03/09 18:57:36",
            user:  "User Xyz",
            target: "x",
            reason: "y",
        })
        commentid = Comments.insert({
            userId: userId,
            postId: postid,
            stamp: "2014/03/09 18:57:36",
            user:  "User Xyz",
            comment: "y",
        })
        postid = Posts.insert({
            stamp: "2014/03/09 15:57:36",
            user:  "User Abc",
            target: "web sites that value form over function",
            reason: "function > *",
            comments: [
                {
                    user: "User X",
                    stamp: "Whenver",
                    comment: "This comment sux.",
                    hates: 0
                },
                {
                    user: "User Y",
                    stamp: "Later",
                    comment: "This comment sux as well.",
                    hates: 3
                },
            ],
        })
        postid = Posts.insert({
            stamp: "2014/03/09 18:54:42",
            user:  "Anonymous User",
            target: "blue skies",
            reason: "they ain't red.",
            comments: [
                {
                    user: "User A",
                    stamp: "Whenver",
                    comment: "This comment sux.",
                    hates: 0
                },
                {
                    user: "Anonymous User",
                    stamp: "Later",
                    comment: "This comment sux as well.",
                    hates: 3
                },
            ],
        })
    }

});
