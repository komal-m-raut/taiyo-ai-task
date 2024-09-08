import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addContact,
  updateContact,
  deleteContact,
} from "../store/contactsSlice";

const ContactsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    id: 0,
    name: "",
    email: "",
  });

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const openModal = (contact = { id: 0, name: "", email: "" }) => {
    setCurrentContact(contact);
    setIsEditing(!!contact.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentContact({ id: 0, name: "", email: "" });
  };

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateContact(currentContact));
    } else {
      dispatch(addContact({ ...currentContact, id: contacts.length + 1 }));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h1>Contacts</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Contact
      </button>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="border-b py-2 flex justify-between">
            <span>
              {contact.name} - {contact.email}
            </span>
            <div>
              <button
                onClick={() => openModal(contact)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Create/Edit Contact */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>{isEditing ? "Edit Contact" : "Create Contact"}</h2>
            <input
              type="text"
              placeholder="Name"
              value={currentContact.name}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, name: e.target.value })
              }
              className="block w-full my-2 p-2 border"
            />
            <input
              type="email"
              placeholder="Email"
              value={currentContact.email}
              onChange={(e) =>
                setCurrentContact({ ...currentContact, email: e.target.value })
              }
              className="block w-full my-2 p-2 border"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
