import orderBy from 'lodash/orderBy'

const sortContacts = (contacts, sorter, reverse) =>
  orderBy(
    contacts,
    contact => {
      if (sorter === 'firstName') {
        return [contact.firstName, contact.lastName]
      } else if (sorter === 'lastName') {
        return [contact.lastName, contact.firstName]
      }
      return contact[sorter]
        ? [contact[sorter], contact.lastName, contact.firstName]
        : undefined
    },
    reverse ? 'desc' : 'asc'
  )

export default sortContacts
