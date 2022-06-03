class Address {
  constructor(road, city, country) {
    this._city = city;
    this._road = road;
    this._country = country;
  }

  get city() {
    return this._city;
  }

  get road() {
    return this._road;
  }

  get country() {
    return this._country;
  }
}

class School {
  constructor(name, address = null) {
    this._name = name;
    this._address = address;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }
}

class Student {
  constructor(ssn, name, school) {
    this._name = name;
    this._school = school;
    this._ssn = ssn;
  }
  get ssn() {
    return this._ssn;
  }
  get name() {
    return this._name;
  }
  get school() {
    return this._school;
  }
}

function getCountry(student) {
  let school = student.school;
  if (school !== null) {
    let addr = school.address;
    if (addr !== null) {
      return addr.country;
    }
  }
  return "Country does not exist!";
}

const zucc = new School("zucc", new Address("Huzhou Road", "Hangzhou", "PRC"));
const liming = new Student("30109999", "liming", zucc);
const country = getCountry(liming);

console.log(country);

import S from "sanctuary";
import {pipe} from 'rambda'


function safeGetCountry(student) {
  return pipe(
    S.map(S.prop("school")),
    S.map(S.prop("address")),
    S.map(S.prop("country"))
  )(S.Just(student));
}

const zuc = new School("zuc");
const liming2 = new Student("30109999", "liming", zuc);

const safeCountry = safeGetCountry(liming);
const safeCountry2 = safeGetCountry(liming2);
console.log(safeCountry);
console.log(safeCountry2);
