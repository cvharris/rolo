import React from 'react';

const UploadInstructions = () => (
  <div className="upload-instructions">
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
        Some of our family members are no longer with us, but you can still
        include them in the upload, especially in order to establish shared
        ancestry. You can include their Date of Death
      </li>
      <li>dod</li>
      <li className="rule-header">The following are optional but valid:</li>
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
        You can automate relating contacts together by including an ID for each
        contact and adding columns for children, parents, and spouse that
        contain ids separated by a comma
      </li>
      <li>id</li>
      <li>spouse</li>
      <li>parents</li>
      <li>children</li>
    </ul>
  </div>
)

export default UploadInstructions
