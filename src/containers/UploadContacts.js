import { sortContactsBy } from 'actions/contactsTableSorterActions'
import ContactsList from 'components/ContactsTable/ContactsList'
import HowItWorks from 'components/HowItWorks'
import UploadInstructions from 'components/UploadInstructions'
import { db } from 'config/firebase'
import Contact from 'lib/Contact'
import isContactInvalid from 'lib/isContactInvalid'
import parseUploadedContacts from 'lib/parseUploadedContacts'
import sortContacts from 'lib/sortContacts'
import memoize from 'lodash/memoize'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const sortAllContacts = memoize(sortContacts)

class UploadContacts extends Component {
  state = {
    contactIds: [],
    contactsById: {},
    fileSize: 1,
    uploading: false,
    uploadProgress: 0
  }

  componentDidMount() {
    // TODO: store uploaded contacts in localstorage until after upload
    const uploadedContacts = JSON.parse(
      localStorage.getItem('uploadedContacts')
    )
  }

  uploadContacts = async () => {
    const { contactIds, contactsById } = this.state
    const { navigate } = this.props
    const uploadedContacts = contactIds.map(cId => contactsById[cId])

    this.setState(prevState => ({
      ...prevState,
      fileSize: contactIds.length,
      uploading: true
    }))

    const updateAll = db.batch()
    uploadedContacts.forEach(contact => {
      updateAll.set(
        db.collection('contacts').doc(contact.id),
        contact.toObject()
      )
    })

    await updateAll.commit()

    localStorage.removeItem('uploadedContacts')

    this.setState(
      {
        contactIds: [],
        contactsById: {},
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

  onUploadComplete = contacts => {
    const mappedContacts = contacts.map((contact, i, arr) => {
      return new Contact({
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
    })
    // TODO: save uploaded Contacts in localStorage
    // localStorage.setItem('uploadedContacts', JSON.stringify(mappedContacts))
    const uploadedContactsMap = mappedContacts.reduce((map, contact) => {
      map[contact.id] = contact
      return map
    }, {})

    this.setState({
      contactIds: mappedContacts.map(con => con.id),
      contactsById: uploadedContactsMap,
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
    const { contactsById } = this.state
    const newContactMap = { ...contactsById, [contact.id]: contact }
    this.setState(prevState => ({
      ...prevState,
      contactsById: newContactMap
    }))
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

    const { contactIds, contactsById } = this.state

    if (contactIds.length === 0) {
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

    const contacts = sortAllContacts(
      contactIds.map(cId => contactsById[cId]),
      sortOrder,
      reverse
    )

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
    sortOrder: state.tableSorter.sortOrder,
    reverse: state.tableSorter.reverse
  }),
  {
    sortContactsBy
  }
)(UploadContacts)
