/**
 * Person object
 * Domain model object for LMS use cases covered in the book
 * Author: Luis Atencio
 */
export const Person = class Person {
	constructor(ssn,firstname, lastname, birthYear = null, address = null) {
		this._ssn = ssn;
		this._firstname = firstname;
		this._lastname = lastname;
		this._birthYear = birthYear;
		this._address = address;
	}

	get ssn() {
		return this._ssn;
	}

	get firstname() {
		return this._firstname;
	}

	set firstname(firstname) {
		this._firstname = firstname;
		return this;
	}

	get lastname() {
		return this._lastname;
	}

	get birthYear() {
		return this._birthYear;
	}
    set birthYear(value){
        this._birthYear= value
    }
	get address() {
		return this._address;
	}

    set address(value){
        this._address= value
    }

	get fullname() {
		return `${this._firstname} ${this._lastname}`;  
	}
};