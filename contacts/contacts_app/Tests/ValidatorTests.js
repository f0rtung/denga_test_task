describe("validateEmail", function(){
	const validator = new Validator();

	it("Check correct emails", function(){
		assert.isTrue(validator.validateEmail("vasya.zadov@gmail.com"));
		assert.isTrue(validator.validateEmail("vasya.zadov@mail.ru"));
		assert.isTrue(validator.validateEmail("vasya.zadov@yandex.ru"));
		assert.isTrue(validator.validateEmail("vasya@yandex.ru"));
	});

	it("Check incorrect emails", function(){
		assert.isFalse(validator.validateEmail("vasya.zadov@gmail"));
		assert.isFalse(validator.validateEmail("vasya.zadovgmail.com"));
	});
});

describe("validatePhone", function(){
	const validator = new Validator();

	it("Check correct phones", function() {
		assert.isTrue(validator.validatePhone("+7(111)222-33-11"));
		assert.isTrue(validator.validatePhone("+7(000)000-00-00"));
    });

	it("Check incorrect phones", function() {
		assert.isFalse(validator.validatePhone("++7(000)000-00-00"));
    	assert.isFalse(validator.validatePhone("+8(111)222-33-11"));
    	assert.isFalse(validator.validatePhone("7(111)222-33-11"));

    	assert.isFalse(validator.validatePhone("+7111)222-33-11"));
    	assert.isFalse(validator.validatePhone("+7(111222-33-11"));
    	assert.isFalse(validator.validatePhone("+7111222-33-11"));

    	assert.isFalse(validator.validatePhone("+7(111)22-33-11"));
    	assert.isFalse(validator.validatePhone("+7(111)22233-11"));
    	assert.isFalse(validator.validatePhone("+7(111)222-3311"));
    	assert.isFalse(validator.validatePhone("+7(111)2223311"));

    	assert.isFalse(validator.validatePhone("+7(000)000-00-0"));
    	assert.isFalse(validator.validatePhone("+7(000)000-00-000"));
    	assert.isFalse(validator.validatePhone("+7(000)000-0-00"));
    	assert.isFalse(validator.validatePhone("+7(000)000-000-00"));
    });
});

describe("validateDate", function(){
	const validator = new Validator();

	it("Check correct dates", function(){
		assert.isTrue(validator.validateDate("05.05.1989"));
		assert.isTrue(validator.validateDate("5.05.1989"));
		assert.isTrue(validator.validateDate("05.5.1989"));
		assert.isTrue(validator.validateDate("5.5.1989"));
	});

	it("Check incorrect dates", function(){
		assert.isFalse(validator.validateDate(".05.1989"));
		assert.isFalse(validator.validateDate("05..1989"));
		assert.isFalse(validator.validateDate("05.05."));
		assert.isFalse(validator.validateDate("05.05.198"));
		assert.isFalse(validator.validateDate("05.05.19899"));
		assert.isFalse(validator.validateDate("0555.05.19899"));
		assert.isFalse(validator.validateDate("05.0577.19899"));
	});
});

describe("validateName", function(){
	const validator = new Validator();

	it("Check correct names", function(){
		assert.isTrue(validator.validateName("Vasya"));
		assert.isTrue(validator.validateName("P"));
	});

	it("Check incorrect names", function(){
		assert.isFalse(validator.validateName(""));
		assert.isFalse(validator.validateName(" "));
		assert.isFalse(validator.validateName("Vasya "));
		assert.isFalse(validator.validateName(" Vasya "));
		assert.isFalse(validator.validateName(" Vasya"));
		assert.isFalse(validator.validateName(" Va sya "));
	});
});