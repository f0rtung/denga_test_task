function ContactBaseForm(parentElemSelector, additionElements){
	const self = this;
	const formID = "ContactForm";
	const validator = new Validator();
	this.inputErrorClassName = "error";

	this.formElements = {
		"first_name": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "first_name",
				placeholder: "First name"
			},
			validate: function(first_name){
				return validator.validateName(first_name);
			}
		},
		"middle_name": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "middle_name",
				placeholder: "Middle name"
			},
			validate: function(middle_name){
				return validator.validateName(middle_name);
			}
		},
		"last_name": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "last_name",
				placeholder: "Last name"
			},
			validate: function(last_name){
				return validator.validateName(last_name);
			}
		},
		"email": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "email",
				placeholder: "E-mail"
			},
			validate: function(email) {
				return validator.validateEmail(email);
			}
		},
		"phone": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "phone",
				placeholder: "Phone"
			},
			validate: function(phone) {
				return validator.validatePhone(phone);
			}
		},
		"birthday": {
		    tag: "<input/>",
			tagOption: {
				type: "text",
				name: "birthday",
				placeholder: "Birthday"
			},
			validate: function(date) {
				return validator.validateDate(date);
			}
		}
	};

	$.extend(this.formElements, additionElements);

	function createForm(elemnts, parentElemSelector){
		const parent = $(parentElemSelector).empty();
		const formObj = $("<form/>", {
			id: formID
		});
		self.errorElem = $("<div/>");
		parent.append(formObj);
		parent.append(self.errorElem);

		self.form = formObj;
		for(let elemIdx in elemnts){
			const element = elemnts[elemIdx];
			appEndElement(formObj, element.tag, element.tagOption);
		}
	}

	function appEndElement(formObj, elementTag, elementOptions){
		const pTag = $("<p/>");
		const newElement = $(elementTag, elementOptions);
		pTag.append(newElement);
		formObj.append(pTag);
	}

	createForm(this.formElements, parentElemSelector);
}

ContactBaseForm.prototype.validateFormAction = function () {
	$("[name]", this.form).removeClass(this.inputErrorClassName);
	const validateResult = this.validate();
	if(!validateResult.isValid){
		this.prepareInvalidInputs(validateResult.errorFields);
		return false;
	}
	return true;
};

ContactBaseForm.prototype.validate = function () {
	const validateResult = { isValid: true, errorFields: [] };
		const inputs = this.getData();
		for(let name in inputs){
			const value = inputs[name];
			const validateFunc = this.formElements[name].validate;
			if(validateFunc != null &&
			   !this.formElements[name].validate(value))
			{
				validateResult.isValid = false;
				validateResult.errorFields.push(name);
			}
		}
		return validateResult;
};

ContactBaseForm.prototype.getData = function () {
	const dataArr = this.form.serializeArray();
	const data = {};
	for(let idx = 0; idx < dataArr.length; ++idx){
		const name = dataArr[idx].name;
		data[name] = dataArr[idx].value;
	}
	return data;
};

ContactBaseForm.prototype.prepareInvalidInputs = function (inputNames) {
	const self = this;
	inputNames.forEach(function(name){
		const elem = $("[name=\"" + name + "\"]", this.form);
		elem.addClass(self.inputErrorClassName);
	});
};

ContactBaseForm.prototype.setData = function(formOptions){
	let options = formOptions || {};
	for(let name in options){
		let input = $("input[name=\"" + name + "\"]", self.form);
		if(input.length != 0){
			input.val(options[name]);
		}
	}
};