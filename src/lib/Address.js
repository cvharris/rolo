import md5 from 'crypto-js/md5'

export default class Address {
  constructor({
    street1 = '',
    street2 = '',
    city = '',
    state = '',
    zip = '00000'
  }) {
    this.street1 = street1
    this.street2 = street2
    this.city = city
    this.state = state
    this.zip = zip
  }

  toHash() {
    return md5(
      `${this.street1}${this.street2}${this.city}${this.state}${this.zip}`
    ).toString()
  }

  toObject() {
    return {
      street1: this.street1,
      street2: this.street2,
      city: this.city,
      state: this.state,
      zip: this.zip
    }
  }
}
