
// Set sign up account options for username only
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

  // This code only runs on the client
  angular.module('simple-social', ['angular-meteor', 'accounts.ui']);

  // Set up angular app automagically
  function onReady() {
    angular.bootstrap(document, ['simple-social']);
  }

  // Check if is running from a smartphone app
  if (Meteor.isCordova)
    angular.element(document).on('deviceready', onReady);
  else
    angular.element(document).ready(onReady);


  // Declare Controller
  angular.module('simple-social').controller('TimelineCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {

      // Subscribe to meteor collections
      $scope.$meteorSubscribe('posts');
      $scope.$meteorSubscribe('relationships');
      $scope.$meteorSubscribe('users');

      // Get users different from logged one
      $scope.users = $meteor.collection( function() {
        return Meteor.users.find({ _id: {$ne: Meteor.userId()} }, { sort: { createdAt: -1 } })
      });

      // Get all posts
      $scope.posts = $meteor.collection( function() {
        return Posts.find({ }, { sort: { createdAt: -1 } })
      });

      // All functions are calls to the server,
      // that way we can make sure nothing
      // is being processed at the client's side

      $scope.addPost = function (newPost) {
        $meteor.call('addPost', newPost);
      };

      $scope.deletePost = function (post) {
        $meteor.call('deletePost', post._id);
      };

      $scope.setPrivate = function (post) {
        $meteor.call('setPrivate', post._id, ! post.private);
      };

      $scope.followUser = function (user) {
        $meteor.call('followUser', user);
      };

      $scope.searchUser = function (search) {
        $meteor.call('searchUser', search);
      };

      $scope.unfollowUser = function (user) {
        $meteor.call('unfollowUser', user);
      };

      $scope.checkRelation = function (user) {
        $meteor.call('checkRelation', user);
      };

    }]);
