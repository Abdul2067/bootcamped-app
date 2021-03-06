import React, { useState } from 'react'

import ContactList from './ContactList'
import CreateContact from './CreateContact'

import * as companyService from '../../services/companyService'

const ContactsCompoment = (props) => {
  const [toggleNew, setToggleNew] = useState(false)

  const handleCreateContact = async (formData) => {
    try {
      const updatedCompany = await companyService.createContact(props.company._id, formData)
      props.handleUpdateCompany(updatedCompany)
    } catch (error) {
      throw error
    }
  }

  const handleDeleteContact = async (contactId) => {
    try {
      await companyService.deleteContact(props.company._id, contactId)
      props.setContacts(props.contacts.filter(contact => contact._id !== contactId))
    } catch (error) {
      throw error
    }
  }

  return (
    <>
    <br />
    <div className="contact-section">
      <div className="header">
        <h3>Contacts</h3>
        <div className="contact-button">
        {props.user &&
              <button onClick={() => setToggleNew(!toggleNew)}>Add a Contact</button>
            }
        </div>
      </div>
      
      { toggleNew &&
        <CreateContact
          {...props}
          setToggleNew={setToggleNew}
          handleCreateContact={handleCreateContact}
          handleDeleteContact={handleDeleteContact}
          handleUpdateCompany={props.handleUpdateCompany}
        />
      }
      <ContactList {...props}/>
      
    </div>
    </>
  )
}

export default ContactsCompoment