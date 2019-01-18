import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from 'config/firebase'
import { ContactListConsumer } from 'containers/ContactListContext'
import Contact from 'lib/Contact'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { mapRefToTypeAheadOption } from 'reducers/currentContactReducer'
import ContactCellContactSelect from './ContactCellContactSelect'
import ContactCellSelect from './ContactCellSelect'
import ContactCellText from './ContactCellText'
import ContactCellTimestamp from './ContactCellTimestamp'

const ContactRow = ({ contact, updateContact }) => {
  const transformDateVal = dateVal => {
    if (dateVal) {
      if (dateVal instanceof firebase.firestore.Timestamp) {
        return dateVal
          .toDate()
          .toISOString()
          .slice(0, 10)
      }

      return new Date(dateVal).toISOString().slice(0, 10)
    }

    return ''
  }

  return (
    <ContactListConsumer>
      {({ contactsById, typeaheadOptions }) => (
        <div className="contact-row items-center lh-copy pa3 ph0-l bb b--black-30 tc">
          <Link
            to={`/edit-contact/${contact.id}`}
            style={{ padding: '0 1rem' }}
          >
            <FontAwesomeIcon icon={['far', 'edit']} />
          </Link>
          <ContactCellText
            field={contact.firstName}
            onFieldChange={val => updateContact('firstName', val)}
          />
          <ContactCellText
            field={contact.maidenName}
            onFieldChange={val => updateContact('maidenName', val)}
          />
          <ContactCellText
            field={contact.lastName}
            onFieldChange={val => updateContact('lastName', val)}
          />
          <ContactCellSelect
            field={contact.gender || ''}
            options={[
              { label: 'Male', value: 'M' },
              { label: 'Female', value: 'F' }
            ]}
            onFieldChange={val => updateContact('gender', val)}
          />
          <ContactCellText
            field={contact.phoneNumber}
            onFieldChange={val => updateContact('phoneNumber', val)}
          />
          <ContactCellText
            field={contact.email}
            onFieldChange={val => updateContact('email', val)}
          />
          <ContactCellTimestamp
            field={transformDateVal(contact.birthday)}
            onFieldChange={val => updateContact('birthday', val)}
          />
          <ContactCellTimestamp
            field={transformDateVal(contact.dod)}
            onFieldChange={val => updateContact('dod', val)}
          />
          <ContactCellContactSelect
            field={mapRefToTypeAheadOption(contact.spouse, contactsById) || ''}
            options={typeaheadOptions}
            onFieldChange={val => updateContact('spouse', val)}
          />
          <ContactCellContactSelect
            field={
              contact.parents.map(doc =>
                mapRefToTypeAheadOption(doc, contactsById)
              ) || []
            }
            options={typeaheadOptions}
            multiSelect={true}
            onFieldChange={val => updateContact('parents', val)}
          />
          <ContactCellContactSelect
            field={
              contact.children.map(doc =>
                mapRefToTypeAheadOption(doc, contactsById)
              ) || []
            }
            options={typeaheadOptions}
            multiSelect={true}
            onFieldChange={val => updateContact('children', val)}
          />
        </div>
      )}
    </ContactListConsumer>
  )
}

ContactRow.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  updateContact: PropTypes.func.isRequired
}

export default ContactRow
