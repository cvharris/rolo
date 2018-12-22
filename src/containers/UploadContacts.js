import ContactsList from 'components/ContactsList'
import firebase, { db } from 'config/firebase'
import parseUploadedContacts from 'lib/parseUploadedContacts'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
        uploadedContacts
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
        const {
          firstName,
          lastName,
          gender,
          birthday,
          email,
          phoneNumber,
          parents,
          children,
          spouse
        } = contact
        this.setState({
          ...this.state,
          uploadProgress: uploadProgress + 1
        })
        return db
          .collection('contacts')
          .doc(contact.id)
          .set({
            firstName,
            lastName,
            gender,
            birthday,
            email,
            phoneNumber,
            parents,
            children,
            spouse
          })
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

  onUploadError = (err, reason) => {
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
            <p>All files should have the following headers:</p>
            <ul>
              <li>firstName</li>
              <li>lastName</li>
              <li>gender</li>
              <li>birthday</li>
              <li className="rule-header">
                So others can use Rolo, include at least one of:
              </li>
              <li>phoneNumber</li>
              <li>email</li>
              <li className="rule-header">
                Some of our family members are no longer with us, but you can
                still include them in the upload, especially in order to
                establish shared ancestry. You can include their Date of Death
              </li>
              <li>dod</li>
              <li className="rule-header">
                The following are optional but valid:
              </li>
              <li>homeAddressStreet1</li>
              <li>homeAddressStreet2</li>
              <li>homeAddressCity</li>
              <li>homeAddressState</li>
              <li>homeAddressZip</li>
              <li>homeAddressCountry</li>
              <li>maidenName</li>
              <li>middleName</li>
              <li>suffix</li>
              <li>prefix</li>
              <li className="rule-header">
                You can automate relating contacts together by including an ID
                for each contact and adding columns for children, parents, and
                spouse that contain ids separated by a comma
              </li>
              <li>id</li>
              <li>spouse</li>
              <li>parents</li>
              <li>children</li>
            </ul>
            <h4>How it Works</h4>
            <p>
              Rolo is a family tree and contact app who want to ditch sending
              spreadsheets around and have contact information integrated with
              their favorite contact tools automatically. You can upload a list
              of all contact information of family members and all your family
              members will have user accounts created for them to access the
              same list of data.
            </p>
            <p>
              For security reasons all users of Rolo can only see contacts they
              are related to. A contact is related to another if they share a
              common ancestor, including through marriage. To calculate this
              correctly uploaded contacts should include relations to all
              children, their parents, and their current spouse, if any of these
              apply.
            </p>
          </div>
        )}
        {uploadedContacts.length > 0 && (
          <div>
            <div onClick={this.uploadContacts}>Submit</div>
            <ContactsList contacts={uploadedContacts} />
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
