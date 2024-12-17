import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import uploadimg from "../assets/upoloadimg.png";
import { addBookAPI } from "../services/allapi";
import { addProjectResponseContext } from "../context/Contextapi";


const Add = () => {
  const {addProjectResponse,setaddProjectResponse}=useContext(addProjectResponseContext)

      const [bookDetails, setBookDetails] = useState({
    pro_id: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    language: "",
    publisher: "", 
    productimg: "",
    user_Id:"",
    link:""
      });
      const [preview, setPreview] = useState("");
      const [imageFileStatus, setImageFileStatus] = useState(false);
      console.log(bookDetails);
    
      useEffect(() => {
        if (
          bookDetails.productimg &&
          (bookDetails.productimg.type === "image/png" ||
            bookDetails.productimg.type === "image/jpg" ||
            bookDetails.productimg.type === "image/jpeg")
        ) {
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

      useEffect(()=>{
        if(sessionStorage.getItem("user")){
          const user=JSON.parse(sessionStorage.getItem("user"))
          console.log(user);
    
          setBookDetails({
            user_Id:user._id
          })
        }
        
        },[])
    
      const [show, setShow] = useState(false);
    
      const handleClose = () => {
        setShow(false);
        setBookDetails({
    pro_id: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    language: "",
    publisher: "",
    productimg: "",
    link:""
        });
        setPreview("");
        setImageFileStatus(false);
      };
      const handleShow = () => setShow(true);
    
      const handleAddBook = async () => {
        const {  pro_id,
          title,
          author,
          genre,
          description,
          language,
          publisher,
          
          productimg,
          user_Id,
          link
        } =  bookDetails;
        if (pro_id && title && author && language  && productimg&&link&&user_Id) {
          const reqBody = new FormData();
          reqBody.append("pro_id", pro_id);
          reqBody.append("title", title);
          reqBody.append("author", author);
          reqBody.append("genre", genre);
          reqBody.append("description", description);
          reqBody.append("language", language);
          reqBody.append("publisher", publisher);
          // reqBody.append("price", price);
          reqBody.append("productimg", productimg);
          reqBody.append("user_Id", user_Id);
          reqBody.append("link", link);

          
          
          const token = sessionStorage.getItem("token");
          if (token) {
            const reqHeader = {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            };
            try {
              
              const result = await addBookAPI(reqBody, reqHeader); // Replace with actual API function
              if (result.status === 200) {
                alert("Book added successfully");
                handleClose();
                setaddProjectResponse(result)
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
    
      return (
        <>
          <Button variant="primary" onClick={handleShow} className="btn btn-primary text-wrap">
            + Add New Book
          </Button>
    
          <Modal centered size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        setBookDetails({
                          ...bookDetails,
                          productimg: e.target.files[0],
                        })
                      }
                    />
                    <img
                      src={preview ? preview : uploadimg}
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
      value={bookDetails.pro_id}
      onChange={(e) =>
        setBookDetails({
          ...bookDetails,
          pro_id: e.target.value,
        })
      }
      type="text"
      placeholder="Product ID"
      className="form-control"
      required
    />
  </div>
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
              <Button variant="primary" onClick={handleAddBook}>
                Add Book
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
    
    
export default Add;
