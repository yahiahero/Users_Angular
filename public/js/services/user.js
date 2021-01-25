'use strict';
(function () {
	angular.module('myApp')

	.factory('User', ['$http', '$window', User]);

	function User ($http, $window) {

		const usersAPI = '/api/users';

		function generateObjectForNotifyJs (message, isSuccess) {
			const colorClass = isSuccess ? 'success' : 'error';
			const NofyJsObj = { message, isSuccess, colorClass };
			return NofyJsObj;
		}

		function create (userName, fullName, defaultCity, password) {
			if (!userName || !fullName || !defaultCity || !password) {
				return Promise.reject('All Fields Are Mandatory');
			}

			const user = {userName, fullName, defaultCity, password}

			return $http.post(usersAPI, user)
			.then(res => {
				const { isSuccess, data } = res.data;
				if (data) {
					const message = isSuccess ? 'User Successfully Created' : 'Sorry Try Again !';
					return generateObjectForNotifyJs(message, isSuccess);
				}
			})
		}

		function get (userId) {
			if (!userId) {
				const error = new TypeError('User ID should Not Be Empty');
				return Promise.reject(error);
			}
			const apiUrl = `${usersAPI}/${userId}`;
			return $http.get(apiUrl)
			.then(res => {
				const { data, isSuccess } = res.data;
				if (data) {
					const message = isSuccess ? 'User Details Retrived Successfully' : 'Sorry!, Something Went Wrong';
					const resData = generateObjectForNotifyJs(message, isSuccess);
					resData.user  = Array.isArray(data) && data[0] || {};
					return resData;
				}
			})
		}

		function getAll () {
			return $http.get(usersAPI)
			.then(res => {
				const { data, isSuccess } = res.data;
				return data || [];
			})
		}

		function update (userObj, userId) {
			if (!userId) {
				const error = new TypeError('User ID should Not Be Empty');
				return Promise.reject(error);
			}

			const keys = ['userName', 'fullName', 'defaultCity'];

			const apiUrl = `${usersAPI}/${userId}`;
			const user = {};
			keys.forEach(key => user[key] = userObj[key]);

			return $http.put(apiUrl, user)
			.then(res => {
				const { data, isSuccess } = res.data;
				if (data) {
					const message = isSuccess ? 'User Updated Successfully' : 'Sorry!, Something Went Wrong';
					return generateObjectForNotifyJs(message, isSuccess);
				}
			})
		}

		function remove (userId) {
			if (!userId) {
				const error = new TypeError('User ID should Not Be Empty');
				return Promise.reject(error);
			}

			const apiUrl = `${usersAPI}/${userId}`;

			return $http.delete(apiUrl)
			.then(res => {
				const { data, isSuccess } = res.data;
				if (data) {
					const message = isSuccess ? 'Successfully Deleted' : 'Sorry!, Something Went Wrong';
					return generateObjectForNotifyJs(message, isSuccess);
				}
			})
		}

		return {
			create: create,
			getAll: getAll,
			get: get,
			update: update,
			remove: remove
		}

	}

})();