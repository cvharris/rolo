import { setAllAddresses } from 'actions/addressesActions'
import { setUserContacts, updateUploadedContact } from 'actions/contactsActions'
import { sortContactsBy } from 'actions/contactsTableSorterActions'
import ContactsList from 'components/ContactsTable/ContactsList'
import HowItWorks from 'components/HowItWorks'
import UploadInstructions from 'components/UploadInstructions'
import { db } from 'config/firebase'
import Contact from 'lib/Contact'
import isContactInvalid from 'lib/isContactInvalid'
import parseUploadedContacts from 'lib/parseUploadedContacts'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { allAddresses } from 'reducers/addresses.reducer'
import { sortedContacts } from 'reducers/contactsTableSorter.reducer'

class UploadContacts extends Component {
  state = {
    fileSize: 1,
    uploading: false,
    uploadProgress: 0
  }

  componentDidMount() {
    // TODO: store uploaded contacts in localstorage until after upload
    // const uploadedContacts = JSON.parse(
    //   localStorage.getItem('uploadedContacts')
    // )
    const { updateContactsList, setAllAddresses } = this.props
    const initialState = { allIds: [], byId: {} }
    updateContactsList(initialState)
    setAllAddresses(initialState)
  }

  uploadContacts = async () => {
    const { addresses } = this.state
    const { contacts, setAllAddresses, navigate } = this.props

    this.setState(prevState => ({
      ...prevState,
      fileSize: contacts.length,
      uploading: true
    }))

    const updateAll = db.batch()

    // Create Contacts
    contacts.forEach(contact => {
      updateAll.set(
        db.collection('contacts').doc(contact.id),
        contact.toObject()
      )
    })

    // Create Addresses
    Object.keys(addresses).forEach(addressHash => {
      updateAll.set(
        db.collection('addresses').doc(addressHash),
        addresses[addressHash.toObject()]
      )
    })

    await updateAll.commit()

    localStorage.removeItem('uploadedContacts')

    setAllAddresses({ allIds: [], byId: {} })

    this.setState(
      {
        uploadProgress: 0,
        fileSize: 1,
        uploading: false
      },
      () => {
        navigate('/')
      }
    )
  }

  onSingleUpload = cursorPosition => {
    this.setState({
      ...this.state,
      uploadProgress: this.state.uploadProgress + cursorPosition
    })
  }

  onUploadError = () => {
    this.setState(prevState => ({
      ...prevState,
      uploadProgress: 0,
      fileSize: 1,
      uploading: false
    }))
  }

  onUploadComplete = (contacts, addresses) => {
    const { updateContactsList, setAllAddresses } = this.props
    // TODO: save uploaded Contacts in localStorage
    // localStorage.setItem('uploadedContacts', JSON.stringify(mappedContacts))
    const uploadedContacts = contacts.reduce(
      (state, contact, i, arr) => {
        const mappedContact = new Contact({
          ...contact,
          children: contact.children.map(child =>
            this.mapClientIdToFirebaseId(child, arr)
          ),
          parents: contact.parents.map(parent =>
            this.mapClientIdToFirebaseId(parent, arr)
          ),
          spouse: contact.spouse
            ? this.mapClientIdToFirebaseId(contact.spouse, arr)
            : null
        })
        state.byId[mappedContact.id] = mappedContact
        state.allIds.push(mappedContact.id)
        return state
      },
      { allIds: [], byId: {} }
    )

    updateContactsList(uploadedContacts)
    setAllAddresses({ allIds: Object.keys(addresses), byId: addresses })

    this.setState({
      uploadProgress: 0,
      fileSize: 1,
      uploading: false
    })
  }

  mapClientIdToFirebaseId = (clientRef, contacts) => {
    const clientId = clientRef.match(/(\d+)$/)

    const firebaseRef = contacts.find(con => con.clientId === clientId[1])

    return firebaseRef ? db.doc(`contacts/${firebaseRef.id}`) : clientRef
  }

  handleUploadedSpreadsheet = file => {
    this.setState({
      ...this.state,
      uploading: true,
      fileSize: file.size
    })

    parseUploadedContacts(
      file,
      this.onSingleUpload,
      this.onUploadComplete,
      this.onUploadError
    )
  }

  updateContact = contact => {
    const { updateUploadedContact } = this.props
    updateUploadedContact(contact)
  }

  render() {
    const { uploadProgress, uploading, fileSize } = this.state
    if (uploading) {
      return (
        <div className="measure-wide pt3 center progress-bar">
          <div className="bg-moon-gray br-pill h1 overflow-y-hidden">
            <div
              className="bg-blue br-pill h1 shadow-1"
              style={{
                width: `${Math.round((uploadProgress / fileSize) * 100)}%`
              }}
            />
          </div>
        </div>
      )
    }

    const { contacts } = this.props

    if (contacts.length === 0) {
      return (
        <div className="instructions measure-wide center lh-copy pb6">
          <h4>Upload Contacts</h4>
          <p>
            Upload a *.csv file with your contacts' information.
            <br />
            After uploading your contacts you will have the chance to add
            relations and fix any bad data before your contacts are saved to the
            database.
          </p>
          <input
            type="file"
            name=""
            accept=".csv"
            onChange={e => this.handleUploadedSpreadsheet(e.target.files[0])}
          />
          <UploadInstructions />
          <HowItWorks />
        </div>
      )
    }

    const { sortOrder, reverse, sortContactsBy } = this.props

    const readyToUpload = contacts.every(con => !isContactInvalid(con))

    return (
      <div className="pt3">
        <div className="uploaded">
          <div className="uploaded-header center measure-wide flex justify-end">
            <button
              className={`f6 link br1 ph3 pv2 mb2 dib ${
                readyToUpload
                  ? 'pointer white bg-dark-blue dim'
                  : 'disabled-button mid-gray bg-moon-gray'
              }`}
              type="button"
              onClick={this.uploadContacts}
              disabled={!readyToUpload}
            >
              Submit
            </button>
          </div>
          <ContactsList
            contacts={contacts}
            sortOrder={sortOrder}
            reverse={reverse}
            updateContact={this.updateContact}
            sortContacts={sortContactsBy}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    addresses: allAddresses(state),
    contacts: sortedContacts(state),
    contactsById: state.contacts.byId,
    sortOrder: state.tableSorter.sortOrder,
    reverse: state.tableSorter.reverse
  }),
  {
    updateContactsList: setUserContacts,
    updateUploadedContact,
    setAllAddresses,
    sortContactsBy
  }
)(UploadContacts)
