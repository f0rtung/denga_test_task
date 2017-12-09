function ContactsTable(parentElemSelector){
	const tableTitles = [
	    "#",
		"ФИО",
		"День рождения",
		"Электронная почта",
		"Телефон",
        "Действия"
	];
	BaseTable.call(this, "contactsTableID", parentElemSelector, tableTitles);
    const self = this;

	this.createTextColumn = function (content, parentElem) {
        const tdElem = $("<td/>");
        tdElem.text(content);
        parentElem.append(tdElem);
    };

	this.redrawComments = function () {
        self.table.empty();
        self.createTableTitle();
        self.createTableRows();
    };

	function removeRow(clientID) {
	    $.post("/contacts/remove_contact/", {id: clientID},
            function (result) {
                if(result.has_error){
                    // show error
                } else {
                    self.redrawComments();
                }
            }
        );
    }

    function editRow(clientID) {
        self.table.trigger('select_contact', {'id': clientID});
    }

    this.createActionColumn = function (elemID, parentElem) {
        function createAElem(elemID, title, iconClass, clickCallback) {
            const aElem = $("<a/>", {
                    href: "#",
                    click: function () { clickCallback(elemID) },
                    title: title,
                }
            );

            aElem.append($("<span/>", {
                class: iconClass,
                width: 20,
            }));
            return aElem;
        }
        const tdElem = $("<td/>");
        tdElem.append(createAElem(elemID, "Remove", "glyphicon glyphicon-trash", removeRow));
        tdElem.append(createAElem(elemID, "Edit", "glyphicon glyphicon-edit", editRow));
        parentElem.append(tdElem);
    }
}

ContactsTable.prototype = Object.create(BaseTable.prototype);
ContactsTable.prototype.constructor = ContactsTable;

ContactsTable.prototype.getRowsData = function(callback){
	ajaxQuery("/contacts/all_contacts/", {}, "get", function(response){
		callback(response);
	});
};

ContactsTable.prototype.createTableColumns = function(parentTrElem, rowValues){
    parentTrElem.attr('id', rowValues.id);
    this.createTextColumn(rowValues.id, parentTrElem);
    this.createTextColumn(rowValues.full_name, parentTrElem);
    this.createTextColumn(rowValues.birthday, parentTrElem);
    this.createTextColumn(rowValues.email, parentTrElem);
    this.createTextColumn(rowValues.phone, parentTrElem);
    this.createActionColumn(rowValues.id, parentTrElem);
};