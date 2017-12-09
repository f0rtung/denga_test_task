function BaseTable(tableID, parentElemSelector, tableTitles){
	this.tableID = tableID;
	this.tableTitles = tableTitles;
	this.createTableElement(parentElemSelector);
	this.createTableTitle();
	this.createTableRows();
	this.setEventDispatchers();
}

BaseTable.prototype.createTableElement = function(parentElemSelector){
	const tableObj = $("<table/>",
				 {
				 	 id: this.tableID,
					 class: "table"
				 }
		);
	$(parentElemSelector).append(tableObj);
	this.table = tableObj;
};

BaseTable.prototype.createOneTableRow = function(createElementsCallback, values){
	const trEelem = $("<tr/>");
	trEelem.append(createElementsCallback(trEelem, values));
	return trEelem;
};

BaseTable.prototype.createTableColumns = function(parentTrElem, values){
	values.forEach(function(value){
		const tdElem = $("<td/>");
		tdElem.text(value);
		parentTrElem.append(tdElem);
	});
};

BaseTable.prototype.createTableTitleCallback = function(parentTrElem, values){
	values.forEach(function(value){
		const thElem = $("<th/>");
		thElem.text(value);
		parentTrElem.append(thElem);
	});
};

BaseTable.prototype.createTableRowCallback = function(parentTrElem, values){
	this.createTableColumns(parentTrElem, values);
};

BaseTable.prototype.createTableTitle = function(){
	const tableHeadElem= $("<thead/>");
	tableHeadElem.append(this.createOneTableRow(this.createTableTitleCallback, this.tableTitles));
	this.table.append(tableHeadElem);
};

BaseTable.prototype.getRowsData = function(callback){

};

BaseTable.prototype.createTableRows = function(){
	const self = this;
	const tableBodyElem = $("<tbody/>");
	self.table.append(tableBodyElem);
	function createRowsCallback(rowsData){
		rowsData.forEach(function(rowData){
			const row = self.createOneTableRow(self.createTableRowCallback.bind(self), rowData);
			tableBodyElem.append(row);
		});
	}
	this.getRowsData(createRowsCallback);
};

BaseTable.prototype.setEventDispatchers = function(){};