$(document).ready(function(){

	var password = document.getElementById("password");
  var error = document.getElementById("error");
  var firstname = document.getElementById("fname").value;
  var lastname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var confirmPassword = document.getElementById("conpassword").value;
	var meter = document.getElementById("password-meter");
	var meter_str = document.getElementById("password-meter-strength");

  //Password Strength using zxcvbn.js
	var strength= {
		0: "Worst",
		1: "Bad",
		2: "Weak",
		3: "Good",
		4: "Strong"
	};

	password.addEventListener("input", function(){
		let passwordVal = password.value;
		var result = zxcvbn(passwordVal);
		meter.value = result.score;
		if (passwordVal !== ""){
			$("#password-meter").removeClass("display-none");
			$("#password-meter-strength").removeClass("display-none");
			$("#password-meter").removeClass("dsktp-display-none");
			$("#password-meter-strength").removeClass("dsktp-display-none");
			meter_str.innerHTML =   strength[result.score];
		}
		else{
			meter_str.innerHTML = "";
		}
		});

	$("#password").on("focusout", function(){
	  $("#password-meter").addClass("display-none");
	  $("#password-meter-strength").addClass("display-none");
	  $("#password-meter").addClass("dsktp-display-none");
	  $("#password-meter-strength").addClass("dsktp-display-none");
	});

	/*general Form Validation*/

	function validateForm() {

		var constraints = {
			from:{
				email: true
			},
		};

    //Simple Regex to ensure that only alphabets are used for names

    var passwordValue = password.value;
    var regex = /^[a-z]+$/i;

		if (regex.test(firstname) !== true || regex.test(lastname) !== true) {
			error.innerHTML = "Enter a valid name";
			return false;
		}

    //checks if email is valid using validate.js
    var emailCheck = validate({from : email}, constraints, {format: "flat"});

		if ( emailCheck !== undefined) {
			error.innerHTML = "The email is not in a valid format.";
			return false;
		}

    //Checks for length of password using validate.js
		if (passwordValue.length <6) {
			error.innerHTML = "Password too short";
			return false;
		}

    if (passwordValue !== confirmPassword){
      error.innerHTML = "Both passwords are not the same";
      return false;
    }


	}

	$("#continue").on("click", function(){
    return validateForm();
	});


});
