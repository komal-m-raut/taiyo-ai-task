import React, { useState } from "react";

const ContactsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState<
    { id: number; name: string; email: string }[]
  >([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
  ]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Contacts</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Contact
      </button>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="border-b py-2">
            <span>{contact.name}</span> - <span>{contact.email}</span>
            {/* You can add edit and delete buttons here */}
          </li>
        ))}
      </ul>

      {/* Modal for Create/Edit Contact */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>Create/Edit Contact</h2>
            {/* Form for creating/editing contact */}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
