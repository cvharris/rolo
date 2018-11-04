export default class Contact {
  constructor({
    id = null,
    firstName = '',
    lastName = '',
    phoneNumber = '',
    email = '',
    address = null,
    birthday = null,
    middleName = '',
    maidenName = '',
    spouse = null,
    parents = [],
    children = []
  }) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.address = address
    this.birthday = birthday
    this.middleName = middleName
    this.maidenName = maidenName
    this.spouse = spouse
    this.parents = parents
    this.children = children
  }
}
