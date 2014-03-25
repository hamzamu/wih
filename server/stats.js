Meteor.publish('stats', function() {
    return Stats.find();
});

/*
 * This should only run once, right?
 */

/*
 *if (stats.pageLoadsFull) {
 *    Stats.pageLoadFull();
 *} else {
 *    // First run
 *    Stats.insert({pageLoadsFull: 1});
 *}
 *
 *Stats.pageLoadFull = function() {
 *    Stats.update({$inc: {pageLoadsFull: 1}});
 *    //Stats.insert({uniqueIPs: {visitorsUniqueIP: 1, ip:  }});
 *}
 */
