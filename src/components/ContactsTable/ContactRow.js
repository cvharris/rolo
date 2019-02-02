import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@reach/router'
import TooltipIcon from 'components/TooltipIcon'
import firebase from 'config/firebase'
import Contact from 'lib/Contact'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { allContacts } from 'reducers/contactsReducer'
import ContactCellContactSelect from './ContactCellContactSelect'
import ContactCellSelect from './ContactCellSelect'
import ContactCellText from './ContactCellText'
import ContactCellTimestamp from './ContactCellTimestamp'

const ContactRow = ({ contact, updateContact, contactsById, allContacts }) => {
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
    <div className="contact-row items-center lh-copy bb b--black-30 tc">
      <Link to={`edit-contact/${contact.id}`} style={{ padding: '0 1rem' }}>
        <FontAwesomeIcon icon={['far', 'edit']} />
      </Link>
      <ContactCellText
        field={contact.firstName}
        onFieldChange={val => updateContact('firstName', val)}
      >
        {!contact.firstName && (
          <TooltipIcon
            icon="exclamation-square"
            text="First Name is required"
            position="top"
            color="dark-red"
          />
        )}
      </ContactCellText>
      <ContactCellText
        field={contact.nickname}
        onFieldChange={val => updateContact('nickname', val)}
      />
      <ContactCellText
        field={contact.maidenName}
        onFieldChange={val => updateContact('maidenName', val)}
      />
      <ContactCellText
        field={contact.lastName}
        onFieldChange={val => updateContact('lastName', val)}
      >
        {!contact.lastName && (
          <TooltipIcon
            icon="exclamation-square"
            text="Last Name is required"
            position="top"
            color="dark-red"
          />
        )}
      </ContactCellText>
      <ContactCellText
        field={contact.suffix}
        onFieldChange={val => updateContact('suffix', val)}
      />
      <ContactCellSelect
        field={contact.gender || ''}
        options={[
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' }
        ]}
        onFieldChange={val => updateContact('gender', val)}
      >
        {!contact.gender && (
          <TooltipIcon
            icon="exclamation-square"
            text="Gender is required"
            position="top"
            color="dark-red"
          />
        )}
      </ContactCellSelect>
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
        required={true}
        onFieldChange={val => updateContact('birthday', val)}
      >
        {!contact.birthday && (
          <TooltipIcon
            icon="exclamation-square"
            text="Birthday is required"
            position="top"
            color="dark-red"
          />
        )}
      </ContactCellTimestamp>
      <ContactCellTimestamp
        field={transformDateVal(contact.dod)}
        onFieldChange={val => updateContact('dod', val)}
      />
      <ContactCellContactSelect
        field={
          contact.spouse
            ? { ...contact.spouse, ...contactsById[contact.spouse.id] }
            : ''
        }
        options={allContacts}
        onFieldChange={val => updateContact('spouse', val)}
      />
      <ContactCellContactSelect
        field={contact.parents.map(conRef => ({
          ...conRef,
          ...contactsById[conRef.id]
        }))}
        options={allContacts}
        multiSelect={true}
        onFieldChange={val => updateContact('parents', val)}
      />
      <ContactCellContactSelect
        field={contact.children.map(conRef => ({
          ...conRef,
          ...contactsById[conRef.id]
        }))}
        options={allContacts}
        multiSelect={true}
        onFieldChange={val => updateContact('children', val)}
      />
    </div>
  )
}

ContactRow.propTypes = {
  contact: PropTypes.instanceOf(Contact).isRequired,
  updateContact: PropTypes.func.isRequired
}

export default connect(state => ({
  contactsById: state.contacts.byId,
  allContacts: allContacts(state)
}))(ContactRow)
