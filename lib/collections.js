Comments = new Meteor.Collection("comments");
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
Site = new Meteor.Collection("site");
Stats = new Meteor.Collection("stats");

/*
 * Users provides
 *  createdAt (s)
 *  _id (s/c)
 *  services (s)
 *  username (s/c)
 */
