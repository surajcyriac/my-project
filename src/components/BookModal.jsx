import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const BookModal = () => {
  const [showModal, setShowModal] = useState(false);

  const bookDetails = {
    bookName: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    releaseDate: "1925-04-10",
    price: 10,
    language: "English",
    bookCover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqieHG-98wpRl3RXtmbBCvOq1EP3KOyoLcAA&s",
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePurchase = () => {
    alert(`You have purchased "${bookDetails.bookName}"!`);
    setShowModal(false);
  };

  return (
    <div className="container text-center mt-5">
      {/* Button to open the modal */}
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        onClick={handleOpenModal}
      >
        Explore Book Details
      </button>

      {/* Modal for book details */}
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-t-lg">
          <Modal.Title className="text-2xl font-semibold">Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-8 bg-white rounded-b-lg shadow-xl">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Book Cover */}
            <div className="flex justify-center md:w-1/3">
              <img
                src={bookDetails.bookCover}
                alt={bookDetails.bookName}
                className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
                style={{ width: "300px", height: "400px", objectFit: "cover" }}
              />
            </div>
            {/* Book Details */}
            <div className="md:w-2/3 text-gray-700">
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-teal-500">Book Name</h5>
                <p className="text-xl">{bookDetails.bookName}</p>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-teal-500">Author</h5>
                <p>{bookDetails.author}</p>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-teal-500">Release Date</h5>
                <p>{new Date(bookDetails.releaseDate).toLocaleDateString()}</p>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-teal-500">Price</h5>
                <p className="text-xl font-semibold">${bookDetails.price}</p>
              </div>
              <div className="mb-4">
                <h5 className="text-lg font-semibold text-teal-500">Language</h5>
                <p>{bookDetails.language}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="p-4 bg-teal-500 rounded-b-lg">
          <Button variant="secondary" onClick={handleCloseModal} className="text-white font-semibold">
            Close
          </Button>
          <Button
            variant="success"
            onClick={handlePurchase}
            className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookModal;
