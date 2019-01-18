import ContactsList from 'components/ContactsTable/ContactsList'
import HowItWorks from 'components/HowItWorks'
import UploadInstructions from 'components/UploadInstructions'
import { db } from 'config/firebase'
import Contact from 'lib/Contact'
import mapContactsToSelectOpts from 'lib/mapContactsToSelectOpts'
import parseUploadedContacts from 'lib/parseUploadedContacts'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UploadContacts extends Component {
  state = {
    fileSize: 1,
    uploading: false,
    uploadProgress: 0,
    uploadedContacts: [],
    uploadedContactsMap: {}
  }

  componentDidMount() {
    const uploadedContacts = JSON.parse(
      localStorage.getItem('uploadedContacts')
    )
    if (uploadedContacts) {
      this.setState({
        ...this.state,
        uploadedContacts: uploadedContacts.map(contact => new Contact(contact))
      })
    }
  }

  uploadContacts = async () => {
    const { uploadedContacts, uploadProgress } = this.state
    this.setState({
      ...this.state,
      fileSize: uploadedContacts.length,
      uploading: true
    })
    // fix references
    await Promise.all(
      uploadedContacts.map(contact => {
        this.setState({
          ...this.state,
          uploadProgress: uploadProgress + 1
        })
        return db
          .collection('contacts')
          .doc(contact.id)
          .set(contact.toObject())
      })
    )

    localStorage.removeItem('uploadedContacts')

    this.setState({
      uploadProgress: 0,
      fileSize: 1,
      uploading: false,
      uploadedContacts: []
    })
  }

  onSingleUpload = cursorPosition => {
    this.setState({
      ...this.state,
      uploadProgress: this.state.uploadProgress + cursorPosition
    })
  }

  onUploadError = () => {
    this.setState({
      uploadProgress: 0,
      fileSize: 1,
      uploading: false,
      uploadedContacts: []
    })
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
    // localStorage.setItem('uploadedContacts', JSON.stringify(mappedContacts))
    this.setState({
      uploadProgress: 0,
      fileSize: 1,
      uploading: false,
      uploadedContacts: mappedContacts,
      uploadedContactsMap: mappedContacts.reduce((map, contact) => {
        map[contact.id] = contact
        return map
      }, {})
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
    this.setState(prevState => ({
      ...prevState,
      uploadContacts: prevState.uploadContacts.map(cont =>
        cont.id === contact.id ? contact : cont
      )
    }))
  }

  render() {
    const {
      uploadedContacts,
      uploadedContactsMap,
      uploadProgress,
      uploading,
      fileSize
    } = this.state

    return (
      <div className="pt3">
        {uploading && (
          <div className="measure-wide center progress-bar">
            <div className="bg-moon-gray br-pill h1 overflow-y-hidden">
              <div
                className="bg-blue br-pill h1 shadow-1"
                style={{
                  width: `${Math.round((uploadProgress / fileSize) * 100)}%`
                }}
              />
            </div>
          </div>
        )}
        {uploadedContacts.length === 0 && (
          <div className="instructions measure-wide center lh-copy pb6">
            <h4>Upload Contacts</h4>
            <p>
              Upload a *.csv file with your contacts' information.
              <br />
              After uploading your contacts you will have the chance to add
              relations and fix any bad data before your contacts are saved to
              the database.
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
        )}
        {uploadedContacts.length > 0 && (
          <div className="uploaded">
            <div className="uploaded-header center measure-wide flex justify-end">
              <div
                className="f6 link dim br1 ph3 pv2 mb2 dib white bg-dark-blue"
                onClick={this.uploadContacts}
              >
                Submit
              </div>
            </div>
            <ContactsList
              contacts={uploadedContacts}
              updateContact={this.updateContact}
              contactTypeaheadOptions={mapContactsToSelectOpts(
                uploadedContacts
              )}
              contactsMap={uploadedContactsMap}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({}),
    null
  )(UploadContacts)
)
