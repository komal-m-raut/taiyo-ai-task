import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addContact,
  updateContact,
  deleteContact,
} from "../store/contactsSlice";
import { FaTimes } from "react-icons/fa";

const defaultContact = {
  id: 0,
  firstName: "",
  lastName: "",
  status: false,
};

const ContactsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState(defaultContact);

  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const openModal = (contact = defaultContact) => {
    setCurrentContact(contact);
    setIsEditing(!!contact.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentContact(defaultContact);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentContact({
      ...currentContact,
      [e.target.name]: e.target.value,
    });
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
    <div className="flex flex-col items-center">
      <button
        onClick={() => openModal()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-auto mb-8"
      >
        Create Contact
      </button>

      {contacts.length > 0 ? (
        <div className="flex gap-x-2 flex-wrap">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col gap-y-4 border justify-between border-gray-300 rounded-lg p-4 shadow-md mb-4 w-full sm:w-60"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    {contact.firstName + " " + contact.lastName}
                  </h2>
                  <p
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      contact.status
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {contact.status ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <button
                  onClick={() => openModal(contact)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-x-2 border-2 border-black p-4 rounded-md">
          <FaTimes size={24} />
          <p className="text-lg">
            No contact found, please add contact from Create Contact Button
          </p>
        </div>
      )}

      {/* Modal for Create/Edit Contact */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>{isEditing ? "Edit Contact" : "Create Contact"}</h2>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={currentContact.firstName}
              onChange={handleChange}
              className="block w-full my-2 p-2 border"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={currentContact.lastName}
              onChange={handleChange}
              className="block w-full my-2 p-2 border"
            />
            <div className="my-2">
              <label className="block mb-1">Status</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="true"
                    checked={currentContact.status === true}
                    onChange={() =>
                      setCurrentContact({ ...currentContact, status: true })
                    }
                    className="mr-2"
                  />
                  Active
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="false"
                    checked={currentContact.status === false}
                    onChange={() =>
                      setCurrentContact({ ...currentContact, status: false })
                    }
                    className="mr-2"
                  />
                  Inactive
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded w-20"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded w-20"
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
