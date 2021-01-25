'use strict';
(function () {
	angular.module('myApp')

	.controller('userListCtrl', ['$location', 'User', userListCtrl]);

	function userListCtrl ($location, User) {

		const vm = this;

		User.getAll()
		.then(users => vm.users = users);

		vm.deleteUser = function deleteUser (e, user) {
			e.preventDefault();
			var userId = user.id;
			var index = vm.users.indexOf(user);
			User.remove(userId)
			.then(data => {
				vm.users.splice(index, 1);
				vm.isSubmitted = true;
				vm.isSuccess = data.isSuccess;
				vm.message   = data.message

				// NotifyJs Method.. To show notification on submit..
				$.notify(data.message, data.colorClass);
			})
		}

		vm.goToUpdateUserView = function goToUpdateUserView (e, user) {
			e.preventDefault();
			var userId = user.id;
			$location.url('/users/edit/' + userId);
		}

	}

})();