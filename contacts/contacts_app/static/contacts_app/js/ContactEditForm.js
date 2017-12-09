function ContactEditForm(parentElemSelector, contact_id){
	const self = this;
	const callback = function (response) {
		if(response.has_error){
			self.errorElem.text(response.message);
		} else{
			self.errorElem.empty();
			self.form.trigger('edit_contact');
		}
    };

	const additionElements = {
		"submitBtn": {
			tag: "<input/>",
			tagOption: {
				type: "submit",
				value: "Edit",
				class: "btn btn-primary",
				click: function (event) {
					event.preventDefault();
					if(self.validateFormAction()){
						ajaxQuery("/contacts/edit_contact/", self.getData(), "post", callback);
					}
				}
			}
		},
		"id": {
			tag: "<input/>",
			tagOption: {
				type: "hidden",
				name: "id"
			}
		}
	};

	const submitOptions =  {
		tag: "<input/>",
		tagOption: {
			type: "submit",
			value: "Edit",
			class: "btn btn-primary",
			click: function (event) {
				event.preventDefault();
				if(self.validateFormAction()){
					ajaxQuery("/contacts/edit_contact/", self.getData(), "post", callback);
				}
			}
		}
    };
	ContactBaseForm.call(this, parentElemSelector, additionElements);
	ajaxQuery("/contacts/contact/" + contact_id + "/", {}, "get",
			  function (response) { self.setData(response) } );
}

ContactEditForm.prototype = Object.create(ContactBaseForm.prototype);
ContactEditForm.prototype.constructor = ContactEditForm;