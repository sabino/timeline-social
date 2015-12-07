Meteor.methods({
  /**
 * @summary Adds a new post using the Meteor.userId() as reference
 * @function addPost
 * @locus Anywhere
 * @method insert
 * @memberOf Meteor.methods
 */
  addPost: function (text) {
    // Make sure the user is logged in before inserting a post
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  /**
 * @summary Removes post using the postId as reference
 * @function deletePost
 * @locus Anywhere
 * @method remove
 * @memberOf Meteor.methods
 */
  deletePost: function (postId) {
    var post = Posts.findOne(postId);
    if (post.private || post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },

  /**
 * @summary Set post public or private using the postId as reference
 * @function setPrivate
 * @locus Anywhere
 * @method update
 * @memberOf Meteor.methods
 */
  setPrivate: function (postId, setToPrivate) {
    var post = Posts.findOne(postId);

    // Make sure only the task owner can make a task private
    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.update(postId, { $set: { private: setToPrivate } });
  },

  /**
 * @summary Follow user so his posts become visible
 * @function followUser
 * @locus Anywhere
 * @method insert
 * @memberOf Meteor.methods
 */
  followUser: function (user) {

    if (user === Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Relationships.insert({
      follower: Meteor.userId(),
      followed: user
    });

  },

 /**
 * @summary TODO - not ready yet - unFollow user so his posts become invisible
 * @function unfollowUser
 * @locus Anywhere
 * @method remove
 * @memberOf Meteor.methods
 */
    unfollowUser: function (user) {

    if (user === Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Relationships.remove({
      follower: Meteor.userId(),
      followed: user
    });

  }
});

