import React from 'react';

const HowItWorks = () => (
  <div className="how-it-works">
    <h4>How it Works</h4>
    <p>
      Rolo is a family tree and contact app who want to ditch sending
      spreadsheets around and have contact information integrated with their
      favorite contact tools automatically. You can upload a list of all contact
      information of family members and all your family members will have user
      accounts created for them to access the same list of data.
    </p>
    <p>
      For security reasons all users of Rolo can only see contacts they are
      related to. A contact is related to another if they share a common
      ancestor, including through marriage. To calculate this correctly uploaded
      contacts should include relations to all children, their parents, and
      their current spouse, if any of these apply.
    </p>
  </div>
)

export default HowItWorks
