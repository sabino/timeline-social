  // Publish users table

  Meteor.publish('users', function () {
    return Meteor.users.find({
   });
  });

// Publish composite the posts table related to relationship table
  Meteor.publishComposite('posts', function() {
    return {
      find: function() {
      // Find the current user's following users
      return Relationships.find({ follower: this.userId });
    },
    children: [{
      find: function(relationship) {
        // Find posts from followed users
        return Posts.find({
          $or: [
          { owner: relationship.followed, private: {$ne: true} },
          { owner: this.userId }
          ]
        });
      }
    }]
  }
});


