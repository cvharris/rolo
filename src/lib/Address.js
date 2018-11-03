export default class Address {
  constructor(
    label = '',
    street1 = '',
    street2 = '',
    city = '',
    state = '',
    zip = '00000'
  ) {
    this.label = label
    this.street1 = street1
    this.street2 = street2
    this.city = city
    this.state = state
    this.zip = zip
  }
}
