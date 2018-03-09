import { v4 } from 'uuid'

export default class Contact {

  constructor({
    id = v4(),
    firstName = '',
  }) {
    this.id = id
    this.firstName = firstName
  }
}

/*
  this.phoneNumbers = phoneNumbers
  this.emails = emails
  this.addresses = addresses
  this.lastName = lastName
  this.nickname = nickname
  this.company = company
  this.birthday = birthday
  this.middleName = middleName
  this.maidenName = maidenName
  this.website = website
  this.suffix = suffix
  this.prefix = prefix
  this.jobTitle = jobTitle
*/