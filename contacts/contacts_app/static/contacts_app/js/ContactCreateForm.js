function ContactCreateForm(parentElemSelector){
	const self = this;
	const callback = function (response) {
		if(response.has_error){
			self.errorElem.text(response.message);
		} else{
			self.errorElem.empty();
			self.form.trigger('create_contact');
		}
    };
	const submitOptions =  {
		"submitBtn": {
			tag: "<input/>",
			tagOption: {
			type: "submit",
			value: "Create",
			class: "btn btn-default",
			click: function (event) {
				event.preventDefault();
					if(self.validateFormAction()){
						ajaxQuery("/contacts/create_contact/", self.getData(), "post", callback);
					}
				}
			}
		}
    };

	ContactBaseForm.call(this, parentElemSelector, submitOptions);
}

ContactCreateForm.prototype = Object.create(ContactBaseForm.prototype);
ContactCreateForm.prototype.constructor = ContactCreateForm;