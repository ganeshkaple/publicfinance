var app = angular.module('products', []);

function loginViaFirebase(user_name, password, $window) {
	initFirebaseAuth();
	firebase.auth().signInWithEmailAndPassword(user_name, password).then(function (result) {
		alert('Login Successful, Redirecting now');
		result.user.getIdToken();
		var host = $window.location.host;
		var landingUrl = "http://" + host + "/service";

		$window.location.href = landingUrl;
	}).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('error is' + errorCode + ' and the reason is' + errorMessage);
		alert('error is' + errorCode + ' and the reason is' + errorMessage);


	});
}

// Signs-out of Firebase.
function signOut() {
	// Sign out of Firebase.
	firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
	// Listen to auth state changes.
	firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
	return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
	return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
	return !!firebase.auth().currentUser;
}

// Requests permissions to show notifications.
function requestNotificationsPermissions() {
	console.log('Requesting notifications permission...');
	firebase.messaging().requestPermission().then(function () {
		// Notification permission granted.
		saveMessagingDeviceToken();
	}).catch(function (error) {
		console.error('Unable to get permission to notify.', error);
	});
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
	if (user) { // User is signed in!
		// Get the signed-in user's profile pic and name.
		var profilePicUrl = getProfilePicUrl();
		var userName = getUserName();
		var profilePic = $scope.profile_pic;
		var userFullName = $scope.name;

		// Set the user's profile pic and name.

		profilePic.style.backgroundImage = 'url(' + profilePicUrl + ')';
		userFullName.textContent = userName;

		// Show user's profile and sign-out button.
		userFullName.removeAttribute('hidden');
		profilePic.removeAttribute('hidden');
		signOutButton.removeAttribute('hidden');

		// Hide sign-in button.
		signOutButton.setAttribute('hidden', 'true');

		// We save the Firebase Messaging Device token and enable notifications.
		saveMessagingDeviceToken();
	} else { // User is signed out!
		// Hide user's profile and sign-out button.
		userFullName.setAttribute('hidden', 'true');
		profilePic.setAttribute('hidden', 'true');
		signOutButton.setAttribute('hidden', 'true');

		// Show sign-in button.
		signInButton.removeAttribute('hidden');
	}
}

// Saves the messaging device token to the datastore.
function saveMessagingDeviceToken() {
	firebase.messaging().getToken().then(function (currentToken) {
		if (currentToken) {
			console.log('Got FCM device token:', currentToken);
			// Saving the Device Token to the datastore.
			firebase.database().ref('/fcmTokens').child(currentToken)
				.set(firebase.auth().currentUser.uid);
		} else {
			// Need to request permissions to show notifications.
			requestNotificationsPermissions();
		}
	}).catch(function (error) {
		console.error('Unable to get messaging token.', error);
	});
}


// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
	// Return true if the user is signed in Firebase
	if (isUserSignedIn()) {
		return true;
	}

	// Display a message to the user using a Toast.
	var data = {
		message: 'You must sign-in first',
		timeout: 2000
	};
	signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
	return false;
}

// Resets the given MaterialTextField.
function resetMaterialTextfield(element) {
	element.value = '';
	element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}


app.controller('productCTRL', function ($scope, $http, $window) {

	$scope.loader = {
		loading: false
	};

	$scope.cars = [
		{model: "Ford Mustang", color: "red"},
		{model: "Fiat 500", color: "white"},
		{model: "Volvo XC90", color: "black"}
	];
	$scope.showCreateForm = function () {
		// clear form
		$scope.clearForm();

		// change modal title
		$('#modal-product-title').text('Create New Student');

		// hide update product button
		$('#btn-update-product').hide();

		// show create product button
		$('#btn-create-product').show();

	};

	// Clear form values
	$scope.clearForm = function () {
		$scope.id = "";
		$scope.name = "";
		$scope.description = "";
		$scope.price = "";
		$scope.modalstatustext = "";
	};

	// Hide Form fields
	$scope.hideFormFields = function () {
		$('#form-dinminder').hide();
	};

	// Show Form fields
	$scope.showFormFields = function () {
		$('#form-dinminder').show();
	};


	// Read product by ID
	$scope.readOne = function (id) {
		// clear modal content
		$scope.clearForm();
		$scope.hideFormFields();

		// change modal title
		$('#modal-product-title').text("Edit Student");

		// show udpate product button
		$('#btn-update-product').show();

		// show create product button
		$('#btn-create-product').hide();

		$scope.loader.loading = true;

		// get id
		$http.get('api/list/' + id)
			.success(function (data, status, headers, config) {
				//Show fields
				$scope.showFormFields();
				// put the values in form
				$scope.id = data.product[0].id;
				$scope.name = data.product[0].name;
				$scope.description = data.product[0].description;
				$scope.price = data.product[0].price;

				// show modal
				$('#myModal').modal('show');
				//Turn off spinner
				$scope.loader.loading = false;
			})
			.error(function (data, status, headers, config) {
				//Turn of spinner & display error
				$scope.loader.loading = false;
				$scope.modalstatustext = "There was an error fetching data";
			});
	};
	//find distance
	$scope.origin = function () {

		$scope.loader.loading = true;

		$http.post('/api/origin', {
			'origins': $scope.orings,

			'destinations': $scope.destinations
		})
			.success(function (data, status, headers, config) {
				// close modal
				console.log("inserted successfully");
			})

	};
	// Create Product createRegister()
	$scope.createProduct = function () {

		$scope.loader.loading = true;

		$http.post('/api/insert', {
			'name': $scope.name,
			'description': $scope.description,
			'price': $scope.price
		})
			.success(function (data, status, headers, config) {
				// close modal
				console.log("inserted successfully");
			})

	};
	//verify number..

	$scope.login = function () {

		$scope.loader.loading = true;

		$http.post('/api/login', {
			'email': $scope.email,
			'password': $scope.password
		})
			.success(function (data, status, headers, config) {
				//The modal id is the #confirm + id ( d.id ) passed into function.
				//The confirm modal is unique to the ID (#confirm+ID) of the product.
				//$('#confirm' + email).modal('hide');
				// refresh the list
				//$scope.getAll();
				location.reload();
			})
			.error(function (data, status, headers, config) {
				$scope.modalstatustext = "Unable to get data!";
				// refresh the list
				$scope.getAll();
			});

	};

	//otp
	//destinationapi
	$scope.forgotPass = function () {

		$scope.loader.loading = true;


		return $http.post('/api/mobile', {


			'mobile': $scope.mobile


		})
			.success(function (data, status, headers, config) {
				// close modal
				alert('success');
			})

	};
	//otp verification
	$scope.sendOtp = function () {

		$scope.loader.loading = true;


		return $http.post('/api/otp', {


			'mobile': $scope.mobile,
			'otp': $scope.otp


		})
			.success(function (data, status, headers, config) {
				// close modal
				location.reload();
			})

	};
	//check parcel
	//store:

	$scope.checkApi = function ($location) {

		$scope.loader.loading = true;


		$http.post('/check', {
			'demo': $scope.demo,
			'dest': $scope.dest,
			'length': $scope.length,
			'width': $scope.width,
			'height': $scope.height,
			'weight': $scope.weight,
			'package': $scope.package,
			'parcel': $scope.parcel,
			'date': $scope.date


		})
			.success(function (data) {
				$scope.registrations = data;
				$scope.registration1 = data1;
				$scope.registration2 = data2;
				$scope.registration3 = data3;
				$scope.registration4 = data4;


			});

	};

	$scope.createRegister = function () {

		$scope.loader.loading = true;

		$http.post('/api/register', {
			'firstname': $scope.firstname,
			'lastname': $scope.lastname,
			'email': $scope.email,
			'phone': $scope.phone,
			'mobile': $scope.mobile,
			'pan': $scope.pan,
			'date': $scope.date
		})
			.then(function (response) {
				$scope.myWelcome = response.data.report;
				var host = $window.location.host;
				var landingUrl = "http://" + host + "/service1";
				//alert(landingUrl);
				$window.location.href = landingUrl;


			});

	};

	//register
	$scope.Register = function () {

		$scope.loader.loading = true;

		$http.post('/api/newregister', {
			'fullname': $scope.fullname,
			'mobile': $scope.mobile,
			'idproof': $scope.idproof,
			'idproofno': $scope.idproofno,
			'address': $scope.address

		})
			.then(function (response) {
				$scope.myWelcome = response.data.report;
				var host = $window.location.host;
				var landingUrl = "http://" + host + "/loan";
				//alert(landingUrl);
				$window.location.href = landingUrl;


			});

	};
	//sannunity pageX
	$scope.expend = function () {

		$scope.loader.loading = true;

		$http.post('/api/expend', {
			'Room_Rent': $scope.Room_Rent,
			'Light_Bill': $scope.Light_Bill,
			'Mobile_Bill': $scope.Mobile_Bill,
			'Payment': $scope.Payment,
			'Petrol': $scope.Petrol,
			'Others': $scope.Others,
			'date': $scope.date

		})
			.then(function (response) {
				$scope.expend = response.data.expenditure;
				var host = $window.location.host;
				var landingUrl = "http://" + host + "/service";
				//alert(landingUrl);
				$window.location.href = landingUrl;


			});

	};


	//Read all entries
	$scope.getAll = function () {

		$scope.loader.loading = true;

		$http.get("/api/list")
			.success(function (response) {
				if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no products available!";
					$scope.loader.loading = false;
				} else {
					$scope.names = response.goa12;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
			})
			.error(function (data, status, headers, config) {
				$scope.loader.loading = false;
				$scope.statustext = "There was an error fetching data, please check database connection!";
			});
	};

	//getting all fileds of table:
	$scope.tableAll = function () {
		$http.post('/api/report', {
			'fdate': $scope.fdate,
			'tdate': $scope.tdate
		}).then(function (response) {
			$scope.reg = response.data.report;
			//Show fields
			// $scope.showFormFields();
			// put the values in form
			/* $scope.fdate = data.report[0].fdate;
			 $scope.tdate = data.report[0].tdate;
			 $scope.loan_acc = data.report[0].loan_acc;
			 $scope.lent = data.report[0].lent;
			 $scope.interest = data.report[0].interest;
			 $scope.earned = data.report[0].earned;
			 $scope.balance = data.report[0].balance;
			 $scope.received_amount = data.report[0].received_amount;*/
		})
	};
	$scope.mylent = function () {
		$http.post('/lent', {
			'fdate': $scope.fdate,
			'tdate': $scope.tdate
		}).then(function (response) {
			$scope.lent = response.data.report;

		})
	};
	$scope.datesort = function () {
		$http.post('/datesort', {
			'fdate': $scope.fdate,
			'tdate': $scope.tdate
		}).then(function (response) {
			$scope.datesort = response.data.report;

		})
	};

	$scope.mylogin = function () {

		var user_name = $scope.user_name;
		var password = $scope.password;

		loginViaFirebase(user_name, password, $window);
		/*if ($scope.user_name == 'admin' && $scope.password == 'admin') {
			var host = $window.location.host;
			var landingUrl = "http://" + host + "/service";
			//alert(landingUrl);
			$window.location.href = landingUrl;
		} else {
			alert('wrong stuff');
		}
*/

	};
	$scope.myrec = function () {
		$http.post('/receive', {
			'fdate': $scope.fdate,
			'tdate': $scope.tdate
		}).then(function (response) {
			$scope.receive = response.data.report;

		})
	};
	$scope.myall = function () {
		$http.get('/all', {}).then(function (response) {
			$scope.all = response.data.report;

		})
	};

	$scope.table = function () {
		$http.get('/table', {}).then(function (response) {
			$scope.all = response.data.report;

		})
	};
	$scope.newuser = function () {
		$http.get('/newuser', {}).then(function (response) {
			$scope.newuser = response.data.report;

		})
	};
	$scope.getData = function () {

		$scope.loader.loading = true;

		$http.post("http://localhost:3000/search").success(function (data) {
			$scope.datalist = data; // the above mentioned datalist
		})
	};
	// update product record / save changes
	$scope.updateProduct = function () {

		$scope.loader.loading = true;

		$http.put('/api/update', {
			'id': $scope.id,
			'name': $scope.name,
			'description': $scope.description,
			'price': $scope.price
		})
			.success(function (data, status, headers, config) {
				// close modal
				$('#myModal').modal('hide');

				// clear modal content
				$scope.clearForm();

				// refresh the product list
				$scope.getAll();
			})
			.error(function (data, status, headers, config) {
				$scope.loader.loading = false;
				$scope.modalstatustext = "Unable to Update data!";
			});
	};

	//Delete product
	$scope.deleteProduct = function (id) {
		$scope.loader.loading = true;

		$http.post('/api/delete', {
			'id': id
		})
			.success(function (data, status, headers, config) {
				//The modal id is the #confirm + id ( d.id ) passed into function.
				//The confirm modal is unique to the ID (#confirm+ID) of the product.
				$('#confirm' + id).modal('hide');
				// refresh the list
				$scope.getAll();
			})
			.error(function (data, status, headers, config) {
				$scope.modalstatustext = "Unable to delete data!";
				// refresh the list
				$scope.getAll();
			});
	};
	$scope.showCreateForm = function () {
		// clear form
		$scope.clearForm();

		// change modal title
		$('#modal-product-title').text('Create New Student');

		// hide update product button
		$('#btn-update-product').hide();

		// show create product button
		$('#btn-create-product').show();

	};

	// Clear form values
	$scope.clearForm = function () {
		$scope.id = "";
		$scope.name = "";
		$scope.address_line1 = "";
		$scope.address_line2 = "";
		$scope.state = "";
		$scope.city = "";
		$scope.pincode = "";
		$scope.mobileno = "";
		$scope.modalstatustext = "";
	};

	// Hide Form fields
	$scope.hideFormFields = function () {
		$('#form-dinminder').hide();
	};

	// Show Form fields
	$scope.showFormFields = function () {
		$('#form-dinminder').show();
	};

	//Read all entries
	$scope.getAll = function () {

		$scope.loader.loading = true;

		$http.get("api/list")
			.success(function (response) {
				if (response.error === 2) {
					//if error code is returned from node code, then there are no entries in db!
					$scope.statustext = "There are currently no products available!";
					$scope.loader.loading = false;
				} else {
					$scope.names = response.products;
					//Turn off spinner
					$scope.loader.loading = false;
					$scope.statustext = "";
				}
			})
			.error(function (data, status, headers, config) {
				$scope.loader.loading = false;
				$scope.statustext = "There was an error fetching data, please check database connection!";
			});
	};

	// Read product by ID
	$scope.readOne = function (id) {
		// clear modal content
		$scope.clearForm();
		$scope.hideFormFields();

		// change modal title
		$('#modal-product-title').text("Edit Student");

		// show udpate product button
		$('#btn-update-product').show();

		// show create product button
		$('#btn-create-product').hide();

		$scope.loader.loading = true;

		// get id
		$http.get('api/list/' + id)
			.success(function (data, status, headers, config) {
				//Show fields
				$scope.showFormFields();
				// put the values in form
				$scope.id = data.product[0].id;
				$scope.name = data.product[0].name;
				$scope.address_line1 = data.product[0].address_line1;
				$scope.address_line2 = data.product[0].address_line2;
				$scope.state = data.product[0].state;
				$scope.city = data.product[0].city;
				$scope.pincode = data.product[0].pincode;
				$scope.mobileno = data.product[0].mobileno;

				// show modal
				$('#myModal').modal('show');
				//Turn off spinner
				$scope.loader.loading = false;
			})
			.error(function (data, status, headers, config) {
				//Turn of spinner & display error
				$scope.loader.loading = false;
				$scope.modalstatustext = "There was an error fetching data";
			});
	};

	// Create Product
	$scope.createProduct = function () {

		$scope.loader.loading = true;

		$http.post('/api/insert', {
			'name': $scope.name,
			'address_line1': $scope.address_line1,
			'address_line2': $scope.address_line2,
			'state': $scope.state,
			'city': $scope.city,
			'pincode': $scope.pincode,
			'mobileno': $scope.mobileno

		})
			.success(function (data, status, headers, config) {
				// close modal
				$('#myModal').modal('hide');

				// clear modal content
				$scope.clearForm();

				// refresh the product list
				$scope.getAll();
			})
			.error(function (data, status, headers, config) {
				$scope.loader.loading = false;
				$scope.modalstatustext = "Unable to Update data!";
			});
	};
	//create annunity
	$scope.createAnnunity = function () {

		$scope.loader.loading = true;

		$http.post('/api/send', {
			'loan': $scope.loan,
			'interest': $scope.interest,
			'startdate': $scope.startdate,
			'tinterest': $scope.tinterest,
			'noofinstallment': $scope.noofinstallment,
			'year': $scope.year,
			'month': $scope.month,
			'week': $scope.week,
			'day': $scope.day,
			'tpayamount': $scope.tpayamount,
			'enddate': $scope.enddate


		})
			.then(function (response) {
				$scope.annunity = response.data;
				var host = $window.location.host;
				var landingUrl = "http://" + host + "/service2";
				//alert(landingUrl);
				$window.location.href = landingUrl;

			});

	};
	//createTAmount()

	$scope.createTAmount = function () {

		$scope.loader.loading = true;

		$http.post('/api/tamount', {
			'TAmount': $scope.TAmount,
			'LAmount': $scope.LAmount,
			'TIAmount': $scope.TIAmount,
			'RAmount': $scope.RAmount,
			'DAmount': $scope.DAmount,
			'date': $scope.date
		})
			.then(function (response) {
				$scope.receive = response.data;
				var host = $window.location.host;
				var landingUrl = "http://" + host + "/service";
				//alert(landingUrl);
				$window.location.href = landingUrl;


			});

	};


	// update product record / save changes
	$scope.updateProduct = function () {

		$scope.loader.loading = true;

		$http.put('/api/update', {
			'id': $scope.id,
			'address_line1': $scope.address_line1,
			'address_line2': $scope.address_line2,
			'state': $scope.state,
			'city': $scope.city,
			'name': $scope.name,
			'pincode': $scope.pincode,
			'mobileno': $scope.mobileno
		})
			.success(function (data, status, headers, config) {
				// close modal
				$('#myModal').modal('hide');

				// clear modal content
				$scope.clearForm();

				// refresh the product list
				$scope.getAll();
			})
			.error(function (data, status, headers, config) {
				$scope.loader.loading = false;
				$scope.modalstatustext = "Unable to Update data!";
			});
	};

	//Delete product

//$scope.jQuery = undefined;

	$scope.jQuery = $(document).ready(function () {
		$('input.typeahead').typeahead({


			name: 'typeahead',
			remote: 'http://localhost:3000/search?key=%QUERY',

			limit: 3
		});

	});
	$scope.getTaleAll = function () {

		$scope.loader.loading = true;

		$http.get('/api/list')
			.then(function (response) {

				$scope.names = response.data.report;

			})

	};
	$scope.updatenote = function () {

		$scope.loader.loading = true;

		$http.get('/updatenote')
			.then(function (response) {

				$scope.update = response.data.report;

			})

	};
//http://localhost:3000/updatenote

	$scope.logout = function () {
		var host = $window.location.host;
		var landingUrl = "http://" + host + "/";
		//alert(landingUrl);
		$window.location.href = landingUrl;

	};
	$scope.home = function () {
		var host = $window.location.host;
		var landingUrl = "http://" + host + "/service";
		//alert(landingUrl);
		$window.location.href = landingUrl;

	};

	$http.get('/newuser', {}).then(function (response) {
		$scope.newuser = response.data.report;
	});
	$http.get('/notification', {}).then(function (response) {
		$scope.notification = response.data.report;
		//var jsonCars = JSON.stringify(cars);
	});


});

//create Annunity()
