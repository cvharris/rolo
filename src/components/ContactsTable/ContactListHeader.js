import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ContactListHeader = ({
  field,
  label,
  sorting,
  reverse,
  handleSorting
}) => (
  <div className="header-col" onClick={e => handleSorting(field)}>
    <span>{label}</span>
    {sorting === field && (
      <span>
        {reverse ? (
          <FontAwesomeIcon icon={['far', 'sort-alpha-up']} />
        ) : (
          <FontAwesomeIcon icon={['far', 'sort-alpha-down']} />
        )}
      </span>
    )}
  </div>
)

export default ContactListHeader
