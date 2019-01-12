export default class Family {
  constructor({
    type = 0,
    fatherSurname = '',
    motherMaidenName = '',
    parents = [],
    children = [],
    grandparents = [],
    ...derp
  }) {
    this.type = type
    this.fatherSurname = fatherSurname
    this.motherMaidenName = motherMaidenName
    this.parents = parents
    this.children = children
    this.grandparents = grandparents
    Object.assign(this, derp)
  }

  // TODO: how to best label a family node?
  // get name() {
  //   switch (this.type) {
  //     case 0:
  //       return this.fatherSurname
  //     case 1:
  //       return `${this.fatherSurname}-${this.motherMaidenName}`
  //     case 2:
  //       return this.fatherSurname
  //     case 3:
  //       return this.motherMaidenName
  //     default:
  //       return this.fatherSurname
  //   }
  // }

  // TODO: update mother's last name (?) based on family type
  // set type(type) {
  //   return type
  // }
}
