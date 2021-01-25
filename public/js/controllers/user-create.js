'use strict';
(function () {
	angular.module('myApp')

	.controller('userCreationCtrl', ['$scope', '$timeout', 'User', userCreationCtrl]);

	function userCreationCtrl ($scope, $timeout, User) {
		$scope.user = {};
		$scope.createUser = function () {
			const { userName, fullName, defaultCity, password } = $scope.user;

			User.create(userName, fullName, defaultCity, password)
			.then(data => {
				// console.log(data);
				$scope.isSubmitted = true;
				$scope.isSuccess = data.isSuccess;
				$scope.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
				
				if (data.isSuccess) {
					$scope.user = {}
				}

				$timeout(hideSubmitMessage, 1000);
				function hideSubmitMessage () {
					$scope.isSubmitted = false;
				}

			})

		};

	}

})();