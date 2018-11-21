export default class Contact {
  constructor({
    firstName = '',
    lastName = '',
    phoneNumber = '',
    email = '',
    gender = '', //drop down selector
    address = null, //own compoent with multiple fields
    birthday = null, //date picker
    middleName = '',
    maidenName = '',
    spouse = null, //auto complete select list
    parents = [], //auto complete select list
    children = [] //auto complete select list
  }) {
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.gender = gender
    this.address = address
    this.birthday = birthday
    this.middleName = middleName
    this.maidenName = maidenName
    this.spouse = spouse
    this.parents = parents
    this.children = children
  }
}
