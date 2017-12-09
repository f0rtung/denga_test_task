function Validator(){

	this.validateName = function(name){
		const splitUserNameResult = name.split(" ");
		return 1 == splitUserNameResult.length &&
			   0 != splitUserNameResult[0].length;
	};

	this.validateEmail = function(email){
		return /^[a-z0-9_\-\.]{2,}@[a-z0-9_\-\.]{2,}\.[a-z]{2,}$/i.test(email);
	};

	this.validatePhone = function(phone){
		const phoneRE = new RegExp("^\\+7\\(\\d{3}\\)\\d{3}(-\\d{2}){2}$");
		return null != phone.match(phoneRE);
	};

	this.validateDate = function (date) {
		const dateRE = new RegExp("^(\\d{1,2}\\.){2}\\d{4}$");
		return null != date.match(dateRE);
    }
}