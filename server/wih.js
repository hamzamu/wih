/*
 * Server side startup
 */
Meteor.startup(function () {

    /*
     * Register DDP connection callback function
     * Use this.stop() if it goes batty
     *
     * This provides site statistics logging
     *
     */
    Meteor.onConnection(function (o) {

        // Get header info we can work with
        var h = null;
        h = getHeaders(o);
// console.log('h: ' + JSON.stringify(h, null, 4));

        // Local vars for logging in order of usage
        var ip = null;
        var isProxied = 1 < h.ipTotal ? true : false;
        var numProxies = h.ipTotal;
        var url = process.env.ROOT_URL;
        var browser = h.browser;
        var userActive = this.userId;
        var visitor = null;
        var ipObject = null;
        var urlObject = null;
        var counter = null;
        var uniqueIP = null;
        var countUniqueIPs = null;
        var uniqueExistsURL = null;
        var countUniqueURLs = null;
        var uniqueBrowser = null;
        var countBrowser = null;
        var languagePrimary = null;
        var languageSecondary = null;
        var stamp = new Date;
        stamp = stamp.getTime();
        
        // Determine IP to log
        if (1 == h.ipTotal) {
            ip = h.ipPublic;
            isProxied = false;
        } else if (1 < ipTotal) {
            ip = ipSource;
            isProxied = true;
            numProxies = h.ipTotal;
        } 
        
        // Populate user data
        if (userActive) {
            var userId = Meteor.userId();
            var username = Meteor.user().username;
            visitor = ({visitors: {
                    ip: ip,
                    stamp: stamp,
                    id: userId,
                    username: username,
                    landing: url,
                    browser: browser,
                }
            });
        } else {
            // #todo
            // If they register we should update this with an id 
            visitor = ({visitors: {
                    ip: ip,
                    stamp: stamp,
                    landing: url,
                    browser: browser,
                }
            });
        }
// console.log('visitor: ' + JSON.stringify(visitor, null, 4));

        // Formulate IP log object
        if (userActive) {
            ipObject = {
                ip: ip,
                stamp: stamp,
                uid: userId,
                username: username,
                landing: url,
                browser: browser,
            };
        } else {
            ipObject = {
                ip: ip,
                stamp: stamp,
                landing: url,
                browser: browser,
            };
        }
// console.log('ipObject: ' + JSON.stringify(ipObject, null, 4));

        // Formulate URL log object
        if (userActive) {
            urlObject = {
                url: url,
                stamp: stamp,
                uid: userId,
                username: username,
            };
        } else {
            urlObject = {
                url: url,
                stamp: stamp,
            };
        }
// console.log('urlObject: ' + JSON.stringify(urlObject, null, 4));

        /*
         * Logs are unique for accountability
         * Counts are strictly one identifying field w/an integer
         * Uniques are detailed records with a count value
         * Might add unique ip object to users as well using $addToSet
         * Might also want to consider seperate collections instead of nesting
         */

        // Connections
        // Essentially, how many times Meteor.onConnect has ran
        if (countConnections = Sitelog.findOne({countConnections: {$exists: true}})) {
            // Increment connection count
            countConnections = 1 + parseInt(countConnections.countConnections);
            Sitelog.update ({countConnections: {$exists: true}},
                            {countConnections: countConnections});
        } else {
            // First connection, w00t!
            Sitelog.insert ({countConnections: 1});
        }
        // IPs
        // This was super buggy but I think I got it, so check it latz
        counter = 0;
        Sitelog.insert ({logIPs: ipObject}); 
        if (Sitelog.find({uniqueIPs: {$exists: true}})
                && (uniqueIP = Sitelog.findOne({'uniqueIPs.ip': ip}))) {
            // ID of record to update
            id = uniqueIP._id;
            // Increment visit count for this ip
            counter = uniqueIP.uniqueIPs.count + 1;
            // Updte existing record
            Sitelog.update ({_id: id}, 
                            {uniqueIPs: {ip: ip, count: counter, stamp: stamp}});
        } else {
           // Insert new unique IP record!
            Sitelog.insert ({uniqueIPs: {ip: ip, count: 1, stamp: stamp}});
            // Increment or initialize unique IP count
            if (!Sitelog.update ({countUniqueIPs: {$exists: true}}, 
                                {$inc: {countUniqueIPs: 1}})) {
                Sitelog.insert ({countUniqueIPs: 1});
            }
        }
        // URLs
        // A URL's count is page views/url loads (I think)
        // countUniqueURLS is lifetime # of URLs that have existed
        // Strange, right?  Meteor. <3
        counter = 0;
        Sitelog.insert ({logURLs: urlObject});
        if (Sitelog.find({uniqueURLs: {$exists: true}})
                && (uniqueURL = Sitelog.findOne({'uniqueURLs.url': url}))) {
            // Get ID of record to update
            id = uniqueURL._id;
            // Increment count for this url
            counter = 1 + uniqueURL.count;
            // Updte existing record
            Sitelog.update ({_id: id},
                            {uniqueURLs: {url: url, count: counter, stamp: stamp}});
        } else {
            // Insert new unique URL record
            Sitelog.insert ({uniqueURLs: {url: url, count: 1, stamp: stamp}});
            // Incremement or initialize unique URL count
            if (!Sitelog.update ({countUniqueIPs: {$exists: true}}, 
                                {$inc: {countUniqueURLs: 1}})) {
                Sitelog.insert ({countUniqueURLs: 1});
            }
        }
        // Browser (user agent) log
        counter = 0;
        if (Sitelog.find({browsers: {$exists: true}})
                && (uniqueBrowser = Sitelog.findOne({'browsers.browser': browser}))) {
            // Get ID of record to update
            id = uniqueBrowser._id;
            // Increment count for this url
            counter = 1 + uniqueBrowser.count;
            // Updte existing record
            Sitelog.update ({_id: id},
                            {browsers: {browser: browser, count: counter, stamp: stamp}});
        } else {
            // Insert new browser
            Sitelog.insert ({browsers: {browser: browser, count: 1, stamp: stamp}});
            // Incremement or initialize browser count
            if (!Sitelog.update ({countUniqueBrowsers: {$exists: true}}, 
                                {$inc: {countUniqueBrowsers: 1}})) {
                Sitelog.insert ({countUniqueBrowsers: 1});
            }
        }
        // Visitors
        Sitelog.insert ({logVisitors: visitor});
        // This is probably not going to work either
        if (userActive) {
            // Registered Visitors
            if (!Sitelog.update ({countVisitorsRegistered: {$exists: true}}, 
                                {$inc: {countVisitorsRegistered: 1}}, true)) {
                Sitelog.insert ({countVisitorsRegistered: 1});
            }
        } else {
            // Anonymous Visitors
            if (!Sitelog.update ({countVisitorsAnonymous: {$exists: true}}, 
                                {$inc: {countVisitorsAnonymous: 1}}, true)) {
                Sitelog.insert ({countVisitorsAnonymous: 1});
            }
        }



        // Primary language
        counter = 0;
        if (uniqueLanguage = Sitelog.find({'languages.language': languagePrimary})) {
            // Grab ID
            id = uniqueLanguage._id;
            // Increment count for this language
            counter = 1 + uniqueLanguage.count;
            // Update count for this language
            Sitelog.update ({_id: id}, 
                            {language: languagePrimary, count: counter, stamp: stamp});
        } else {
            // Insert new language
            Sitelog.update ({languages: {$exists: true}},
                            {$addToSet: {languages: languagePrimary, count: 1, stamp: stamp}},
                            true);
        }
        // Secondary language
        counter = 0;
        if (uniqueLanguage = Sitelog.find({'languages.language': languageSecondary})) {
            // Grab ID
            id = uniqueLanguage._id;
            // Increment count for this language
            counter = 1 + uniqueLanguage.count;
            // Update count for this language
            Sitelog.update ({_id: id}, 
                            {language: languageSecondary, count: counter, stamp: stamp});
        } else {
            // Insert new language
            Sitelog.insert ({languages: {language: languageSecondary, count: 1, stamp: stamp}});
        }

        // Template count?

        // This is probably an appropriate place for stop()..
        //   but what other ramifications are there?
        //   What about things I /do/ want to do every time?
        //   Would anything even make sense to do like that? :>

    // End logging
    });

    /*
     * Populate example data
     */
    if ((Site.demo == true)
            && (Posts.find().count() === 0) 
            ){
        populateTestData();
    }

});


/*
 * Method to return nicely formatted object of header values
 */
var getHeaders = function (connectionObject) {
    // Local vars
    var o = connectionObject;
    var h = null;
    var chain = o.httpHeaders['x-forwarded-for'].split(',');
    var languages = o.httpHeaders['accept-language'].split(',');
    var languagePrimary = languages.slice(0,1);
    var languageSecondary = languages.slice(-1).toString();
    var proxies = null;
    // Strip languages
    languageSecondary = languageSecondary.split(';');
    languageSecondary = languageSecondary.slice(0,1);
    // Set proxy count
    if (typeof(process.env.HTTP_FORWARDED_COUNT) == 'undefined') {
                proxies = 1;
            } else if (process.env.HTTP_FORWARDED_COUNT) {
                proxies = parseInt(process.env.HTTP_FORWARDED_COUNT);
            } else {
                proxies = false;
            }

    // Set proxy count
    if (typeof(process.env.HTTP_FORWARDED_COUNT) == 'undefined') {
                proxies = 1;
            } else if (process.env.HTTP_FORWARDED_COUNT) {
                proxies = parseInt(process.env.HTTP_FORWARDED_COUNT);
            } else {
                proxies = false;
            }
    // Populate header object
    h = {
        browser: o.httpHeaders['user-agent'],
        host: o.httpHeaders.host,
        id: o.id,
        ipChain: chain,
        ipPublic: o.clientAddress,
        ipSource: chain[0],
        ipTotal: proxies,
        languagePrimary: languagePrimary,
        languageSecondary: languageSecondary,
        languages: languages,
    }
    return h;

}

/*
 * Data inserted when debug is set to true
 * and post count is 0
 *
 * Should move this out of this file, ick
 */
var populateTestData = function () {

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
