/*
 * Stats provides:
 */
Stats = new Meteor.Collection("stats");

Meteor.publish('stats', function() {
    return Stats.find();
});
