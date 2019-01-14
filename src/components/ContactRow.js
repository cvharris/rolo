import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from 'config/firebase'
import Contact from 'lib/Contact'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import ContactCell from './ContactCell'
import ContactCellSelect from './ContactCellSelect'

const ContactRow = ({ contact, updateContact }) => (
  <div className="contact-row items-center lh-copy pa3 ph0-l bb b--black-30 tc">
    <Link to={`/edit-contact/${contact.id}`}>
      <FontAwesomeIcon icon={['far', 'edit']} />
    </Link>
    <ContactCell
      field={contact.firstName}
      onFieldChange={val => updateContact('firstName', val)}
    />
    <ContactCell
      field={contact.maidenName}
      onFieldChange={val => updateContact('maidenName', val)}
    />
    <ContactCell
      field={contact.lastName}
      onFieldChange={val => updateContact('lastName', val)}
    />
    <ContactCellSelect
      field={contact.gender}
      options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]}
      onFieldChange={val => updateContact('gender', val)}
    />
    <ContactCell
      field={contact.phoneNumber}
      onFieldChange={val => updateContact('phoneNumber', val)}
    />
    <ContactCell
      field={contact.email}
      onFieldChange={val => updateContact('email', val)}
    />
    <ContactCell
      field={contact.birthday ? contact.birthday.toDate().toDateString() : ''}
      onFieldChange={val =>
        updateContact(
          'birthday',
          firebase.firestore.Timestamp.fromDate(new Date(val))
        )
      }
    />
    <ContactCell
      field={contact.dod ? contact.dod.toDate().toDateString() : ''}
      onFieldChange={val =>
        updateContact(
          'dod',
          firebase.firestore.Timestamp.fromDate(new Date(val))
        )
      }
    />
    <ContactCellSelect
      field={contact.spouse}
      onFieldChange={val => updateContact('spouse', val)}
    />
    <ContactCellSelect
      field={contact.parents}
      multiSelect={true}
      onFieldChange={val => updateContact('parents', val)}
    />
    <ContactCellSelect
      field={contact.children}
      multiSelect={true}
      onFieldChange={val => updateContact('children', val)}
    />
  </div>
)

ContactRow.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  updateContact: PropTypes.func.isRequired
}

export default ContactRow
