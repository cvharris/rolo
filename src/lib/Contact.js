export default class Contact {
  constructor({
    id = '-1',
    clientId = undefined,
    firstName = '',
    lastName = '',
    phoneNumber = '',
    email = '',
    gender = '', // drop down selector
    address = undefined, // own compoent with multiple fields
    birthday = undefined, // date picker
    nickname = '',
    middleName = '',
    maidenName = '',
    spouse = undefined, // auto complete select list
    parents = [], // auto complete select list
    children = [], // auto complete select list
    prefix = '',
    suffix = '',
    dod = undefined
  }) {
    this.id = id
    this.clientId = clientId
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.email = email
    this.gender = gender
    this.address = address
    this.birthday = birthday
    this.nickname = nickname
    this.middleName = middleName
    this.maidenName = maidenName
    this.spouse = spouse
    this.parents = parents
    this.children = children
    this.prefix = prefix
    this.suffix = suffix
    this.dod = dod
  }

  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      gender: this.gender,
      address: this.address,
      birthday: this.birthday,
      nickname: this.nickname,
      middleName: this.middleName,
      maidenName: this.maidenName,
      spouse: this.spouse,
      parents: this.parents,
      children: this.children,
      prefix: this.prefix,
      suffix: this.suffix,
      dod: this.dod,
      clientId: this.clientId
    }
  }
}
