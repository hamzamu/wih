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

        userid = Meteor.users.insert({ "_id" : "7dFzNrqhrDSeQNqaz", "emails" : [  {  "address" : "arthax0r@gmail.com",  "verified" : false } ], "services" : { "password" : { "srp" : { "identity" : "xKNqFijYJS5nD2qQJ", "salt" : "9jBjhFkyXqNg96df2", "verifier" : "dbe7b1793e1277adac59984081bca2707d1937758f9e1f77a6414bb57e163e00db36651c6b97e24eb1b2161f1bcc1728004cc27fff352c9918b82f6f283c67ee5a712a51c6095e48608dd254c26f41a22e9972104683b3d51c52be8306392d6f16f3d9734cb14fee29378a89d912bf4a03efd71d36a0b9a7928155f3896b491a" } }, "resume" : { "loginTokens" : [   {    "hashedToken" : "czpsZAcIgv+U6x0fArjppmsf5Cgj/cvGOX3bUn+wE/Q=" } ] } }, "username" : "arthax0r" });

        postid = Posts.insert({
            stamp: "2014/03/09 18:57:36",
            user:  userid,
            target: "x",
            reason: "y",
        })
        commentid = Comments.insert({
            // userId: userId,
            postId: postid,
            stamp: "2014/03/09 18:57:36",
            user:  "User Xyz",
            comment: "y",
        })

        userid = Meteor.users.insert({ "_id" : "bz8kD6xfMGtwK57GB", "emails" : [  {  "address" : "jasonedwardwhite@gmail.com",  "verified" : false } ], "services" : { "password" : { "srp" : { "identity" : "ogiNdBnECDMq93d7z", "salt" : "sa7cBS58sjGRNytPm", "verifier" : "7f49ee4c59afb86e2e15c9ef50048acdefa5c51d2051a51d735d87a6a468f541a0bad44d8b8b24cf9dd0aa63a8c1379311e57a3c6372146fc582a0c0e79b997787898e6c8113770a2428fb097f467042a87f61c1e2057a3aa25c9e4afcc8c16bc0c1cc12d6c95830668a57ef2feb7dc0e66379d27c2a3966065310a54266666" } }, "resume" : { "loginTokens" : [ ] } }, "username" : "jason" });

        postid = Posts.insert({
            stamp: "2014/03/09 15:57:36",
            user:  userid,
            target: "web sites that value form over function",
            reason: "function > *",
        })
        commentid = Comments.insert({
            // userId: userId,
            postId: postid,
            stamp: "2014/03/09 18:57:36",
            user:  "User Zyx",
            comment: "z",
        })
    }

});
