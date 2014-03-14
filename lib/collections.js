/*
 * Comments provides:
 */
Comments = new Meteor.Collection("comments");
/*
 * Errors provides:
 *   message
 */
Errors = new Meteor.Collection("errors");
/*
 * Posts provides:
 *  stamp
 *  user
 *  target
 *  reason
 *  hates
 *
 */
Posts = new Meteor.Collection("posts");
/*
 * Site provides:
 *   demo
 *   title
 */
Site = new Meteor.Collection("site");
/*
 * Stats provides:
 */
Stats = new Meteor.Collection("stats");
/*
 * Strings provides all strings for site,
 * check strings.js for more
 */
Strings = new Meteor.Collection("strings");

/*
 * Users provides
 *  createdAt (s)
 *  _id (s/c)
 *  services (s)
 *  username (s/c)
 */
