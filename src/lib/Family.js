export default class Family {
  constructor({ name = '', contacts = [], ancestors = [] }) {
    this.name = name
    this.contacts = contacts
    this.ancestors = ancestors
  }
}
