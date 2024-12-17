import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SERVER_URL from "../services/serverUrl";
import { updateProjectAPI } from "../services/allapi";

const Edit = ({products}) => {
  const [preview, setPreview] = useState("");
  const [imageFileStatus, setImageFileStatus] = useState(false);
  // console.log(products);

  const [bookDetails, setBookDetails] = useState({
    id: products._id ,
    pro_id: products.pro_id ,
    title: products.title ,
    author: products.author ,
    genre: products.genre ,
    description: products.description,
    language: products.language ,
    publisher: products.publisher ,
    // price: products.price ,
    link:products.link,
    productimg: "",
  });
  // console.log(bookDetails);

  useEffect(() => {
    if   (bookDetails.productimg.type === "image/png" ||  bookDetails.productimg.type === "image/jpg" ||        bookDetails.productimg.type === "image/jpeg")
    {
      // Valid image
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(bookDetails.productimg));
    } else {
      // Invalid image
      setImageFileStatus(false);
      setPreview("");
      setBookDetails({ ...bookDetails, productimg: "" });
    }
  }, [bookDetails.productimg]);
  

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setBookDetails({
      id:products._id,
      pro_id: products.pro_id,
      title: products.title,
      author: products.author,
      genre: products.genre,
      description: products.description,
      language: products.language,
      publisher: products.publisher, 
      // price: products.price,
      productimg: "",
      link:products.link
    });
    setPreview("");
    setImageFileStatus(false);
  };
  
  const handleShow = () => {
    setShow(true);
    setBookDetails({
      id:products._id,
      pro_id: products.pro_id,
      title: products.title,
      author: products.author,
      genre: products.genre,
      description: products.description,
      language: products.language,
      publisher: products.publisher, 
      // price: products.price,
      productimg: "",
      link:products.link

    })
    }


  


  

  

  const handleeditBook = async () => {
    const {id,pro_id, title, author, genre, description, language, publisher ,productimg,link} =  bookDetails;
    if ( title && author && genre && description && language && publisher  &&link ) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("author", author);
      reqBody.append("genre", genre);
      reqBody.append("description", description);
      reqBody.append("language", language);
      reqBody.append("publisher", publisher);
      // reqBody.append("price", price);
      reqBody.append("link", link);
      preview ? reqBody.append("productimg", productimg) :  reqBody.append("productimg", products.productimg);

      // console.log("rqbody",reqBody);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await updateProjectAPI(id,reqBody,reqHeader); 
          if (result.status == 200) {
            alert("Book updated successfully");
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill all fields");
      
    }
  };
console.log('image', `${products.productimg}`);


  return (
    <>
      <Button
        onClick={handleShow}
        className="mt-0 text-wrap px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md"
      >
        Edit
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>setBookDetails({ ...bookDetails,productimg: e.target.files[0]   })
                  }
                />
                <img
                  src={preview ? preview : `${SERVER_URL}/uploads/${products.productimg}`}
                  alt=""
                  height={"200px"}
                  className="img-fluid"
                />
              </label>
              {!imageFileStatus && (
                <div className="text-warning fw-bolder my-2">
                  Upload an image of types jpg, jpeg, or png
                </div>
              )}
            </div>
            <div className="col">
            <div className="mb-2">
    <input
      value={bookDetails.title}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          title: e.target.value,
        })
      }
      type="text"
      placeholder="Title"
      className="form-control"
      required
    />
  </div>
  <div className="mb-2">
    <input
      value={bookDetails.author}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          author: e.target.value,
        })
      }
      type="text"
      placeholder="Author"
      className="form-control"
      required
    />
  </div>
  <div className="mb-2">
    <input
      value={bookDetails.genre}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          genre: e.target.value,
        })
      }
      type="text"
      placeholder="Genre"
      className="form-control"
    />
  </div>
  <div className="mb-2">
    <textarea
      value={bookDetails.description}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          description: e.target.value,
        })
      }
      placeholder="Description"
      className="form-control"
      rows="3"
    />
  </div>
  <div className="mb-2">
    <input
      value={bookDetails.language}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          language: e.target.value,
        })
      }
      type="text"
      placeholder="Language"
      className="form-control"
      required
    />
  </div>
  <div className="mb-2">
    <input
      value={bookDetails.publisher}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          publisher: e.target.value,
        })
      }
      type="text"
      placeholder="Publisher"
      className="form-control"
    />
  </div>
  <div className="mb-2">
    <input
      value={bookDetails.link}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          link: e.target.value,
        })
      }
      type="text"
      placeholder="link"
      className="form-control"
    />
  </div>
  {/* <div className="mb-2">
    <input
      value={bookDetails.price}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          price: e.target.value,
        })
      }
      type="number"
      placeholder="Price"
      className="form-control"
      required
    />
                  </div> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleeditBook}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
