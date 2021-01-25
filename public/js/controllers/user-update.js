'use strict';
(function () {
	angular.module('myApp')

	.controller('userUpdateCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'User', userCtrl]);

	function userCtrl ($scope, $location, $timeout, $routeParams, User) {
		const { userId } = $routeParams;
		let user = {};

		User.get(userId)
		.then(data => {
			const { isSuccess } = data;

			if (isSuccess) {
				const {username, fullname, default_city } = data.user;
				const userObj = {
					userName: username,
					fullName: fullname,
					defaultCity: default_city
				};

				$scope.user = Object.assign({}, userObj);
				user = Object.assign({}, userObj);
			} else {
				$scope.isUserExist = false;
				$scope.message = data.message;
			}
		})

		$scope.updateUser = function () {
			const isUserChanged = Object.keys(user).some(key => user[key] !== $scope.user[key]);

			function goToUserViewPage(next) {
				$location.url(next);
			}

			if (!isUserChanged) {
				const next = `/users/profile/${userId}`;
				$timeout(() => goToUserViewPage(next), 1000);
				return;
			}

			User.update($scope.user, userId)
			.then(data => {
				const { isSuccess, message } = data;
				Object.assign($scope, {isSuccess, message, isSubmitted: true});
				const next = `/users/profile/${userId}`;
				if (isSuccess) {
					$timeout(() => goToUserViewPage(next), 1000);
				}
			})

		}

	}

})();