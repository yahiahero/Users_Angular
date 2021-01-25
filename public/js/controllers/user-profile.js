'use strict';
(function () {
	angular.module('myApp')

	.controller('userProfileCtrl', ['$scope', '$timeout', '$location', '$routeParams', 'User', userProfileCtrl]);

	function userProfileCtrl ($scope, $timeout, $location, $routeParams, User) {
		const { userId } = $routeParams;
		let user = {};

		User.get(userId)
		.then(data => {
			const { isSuccess } = data;

			if (isSuccess) {
				const {username, fullname, default_city, id } = data.user;
				const userObj = {
					id,
					userName: username,
					fullName: fullname,
					defaultCity: default_city
				};
				$scope.userProperties = Object.keys(userObj)

				$scope.user = Object.assign({}, userObj);
			} else {
				$scope.isUserExist = false;
				$scope.message = data.message;
			}
		})

		$scope.deleteUser = function deleteUser (user) {
			var userId = user.id;
			User.remove(userId)
			.then(function (data) {
				// console.log(data);
				$scope.isSubmitted = true;
				const {isSuccess, message, colorClass} = data;
				Object.assign($scope, { isSuccess, message });

				// NotifyJs Method.. To show notification on submit..
				$.notify(message, colorClass);
				
				function goToUserList () {
				   $location.url('/users')
				}

				$timeout(goToUserList, 900);
			})
		}

		$scope.goToUpdateUserView = function goToUpdateUserView (e, user) {
			e.preventDefault();
			var userId = user.id;
			$location.url('/users/edit/' + userId);
		}

	}

})();