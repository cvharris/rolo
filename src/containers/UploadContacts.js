import ContactsList from 'components/ContactsList';
import HowItWorks from 'components/HowItWorks';
import UploadInstructions from 'components/UploadInstructions';
import firebase, { db } from 'config/firebase';
import parseUploadedContacts from 'lib/parseUploadedContacts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Contact from 'lib/Contact';

class UploadContacts extends Component {
  state = {
    fileSize: 1,
    uploading: false,
    uploadProgress: 0,
    uploadedContacts: []
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
    uploadedContacts.forEach(contact => {
      contact.birthday = firebase.firestore.Timestamp.fromDate(
        new Date(contact.birthday)
      )
      contact.children = contact.children.map(child => {
        const childId = child.match(/(\d+)$/)
        const childRef = uploadedContacts.find(
          con => con.clientId === childId[1]
        )
        return childRef ? db.doc(`/uploadedContacts/${childRef.id}`) : child
      })
      contact.parents = contact.parents.map(parent => {
        const parentId = parent.match(/(\d+)$/)
        const parentRef = uploadedContacts.find(
          con => con.clientId === parentId[1]
        )
        return parentRef ? db.doc(`/uploadedContacts/${parentRef.id}`) : parent
      })
      if (contact.spouse) {
        const spouseRef = uploadedContacts.find(
          con => con.clientId === contact.spouse.match(/(\d+)$/)[1]
        )
        contact.spouse = spouseRef
          ? db.doc(`/uploadedContacts/${spouseRef.id}`)
          : contact.spouse
      }
    })
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
    localStorage.setItem('uploadedContacts', JSON.stringify(contacts))
    this.setState({
      uploadProgress: 0,
      fileSize: 1,
      uploading: false,
      uploadedContacts: contacts
    })
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

  render() {
    const { uploadedContacts, uploadProgress, uploading, fileSize } = this.state

    return (
      <div className="pt3 pb6">
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
          <div className="instructions measure-wide center lh-copy">
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
            <ContactsList contacts={uploadedContacts} />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state) => ({}),
    null
  )(UploadContacts)
)
