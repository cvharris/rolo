import { v4 } from 'uuid'

export default class Contact {
  constructor({ id = v4(), firstName = '', lastName = '', company = '' }) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.company = company
  }
}

/*
  this.phoneNumbers = phoneNumbers
  this.emails = emails
  this.addresses = addresses
  this.nickname = nickname
  this.birthday = birthday
  this.middleName = middleName
  this.maidenName = maidenName
  this.website = website
  this.suffix = suffix
  this.prefix = prefix
  this.jobTitle = jobTitle
*/
