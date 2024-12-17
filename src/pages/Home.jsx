import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import image from"../assets/imagee.webp"
import Header from "../components/Header";

const LandingPage = () => {

    const [isVisible, setIsVisible] = useState(false);
    
    const targetRef = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false); // Reset animation when the element exits the viewport
            }
          });
        },
        { threshold: 0.1 } // Adjust this threshold as needed
      );
  
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }
  
      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }, []);
  
  
  return (

    
    <div className="min-h-screen bg-blue-200">
      {/* Parallax Hero Section */}
      
      <section className=" bg-gray-900 text-white overflow-hidden">
      { sessionStorage.getItem("token") ?
                <Header></Header>
                :
              <header className=" text-white py-4 ">
              <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
              <h1 className="text-4xl font-bold">
              Word<span className="text-2xl font-semibold">Craft</span>
              </h1>
             
              <div className="flex gap-x-6">
              <Link to={'/auth'} className=" px-6 py-2 rounded-lg  text-white  font-bold transition-transform transform hover:scale-110 hover:bg-gray-700">
              Login
            </Link>
            <Link
              to={"/Register"}
              className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold transition-transform transform hover:scale-110  "
            > Signup      
               </Link>
            </div>
          </div>
        </header>
      }

        
        <div className="relative bg-cover bg-center h-screen" 
           style={{ backgroundImage:` url(${image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Warm Up With a Good Book!</h1>
          <p className="text-xl mb-6">Explore our collection and find your next winter read.</p>
          <div className="bg-teal-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-700 shadow-md transition-transform transform hover:scale-110" >
            {
            sessionStorage.getItem("token")?
            <Link      to={"/product"}   >
            Discover Your Next Read
            </Link>
            :
            <Link       to={"/auth"}   >
            Discover Your Next Read
            </Link>
          }
          </div>
{/* 
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-teal-600 mb-8">
            Browse Our Collection
          </h2>
          {
            sessionStorage.getItem("token")?
            <Link className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500"       to={"/product"}   >
            Start Exploring
          </Link>
            :
            <Link className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500"       to={"/auth"}   >
            Start Exploring
          </Link>
          }
        </div>  */}


        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Browse Books</h3>
            <p className="text-white">Explore our vast collection of e-books and find your favorites.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Add to Cart</h3>
            <p className="text-white">Select the books you love and add them to your cart.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Checkout</h3>
            <p className="text-white">Complete your purchase securely and easily.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-teal-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">4</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Download</h3>
            <p className="text-white">Instantly download your e-books and start reading.</p>
          </div>
        </div>
      </div>
      
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold text-teal-600 mb-8">Features</h2>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="bg-teal-50 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Instant Access
            </h3>
            <p className="text-gray-700">
              Download and start reading your favorite books immediately after
              purchase.
            </p>
          </div>
          <div className="bg-teal-50 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Wide Selection
            </h3>
            <p className="text-gray-700">
              Browse a vast collection of e-books in every genre you can think
              of.
            </p>
          </div>
          <div className="bg-teal-50 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              Secure Payments
            </h3>
            <p className="text-gray-700">
              Enjoy hassle-free, secure payments for a smooth shopping
              experience.
            </p>
          </div>
        </div>
      </section>


    {/* All-Time Favorites Section */}
    <section className="py-16 bg-gray-100 flex  justify-center flex-col">
        <h2 className="text-3xl font-semibold text-teal-600 mb-8 text-center" >All-Time Favorites</h2>
       
          <div

            ref={targetRef}
            className={`ms-28 max-w-7xl   flex flex-col md:flex-row flex-wrap justify-center gap-8 transition-transform duration-1000 ${
              isVisible ? "animate-fadeUp" : "opacity-0"
            }`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR819TtvIV0JJ5_Wzzfcnk3y2eXfPpamZmdbrg5ofv0Ydafpw_f"
              alt="To Kill a Mockingbird"
              className="w-52 h-96 rounded-lg shadow-lg"
            />
            <img
              src="         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7uz0DNYz9a05dFiBvgvNYJ4GmV6cbjxUWUSWJrMcxqyAOlp5v
  "
              alt="To Kill a Mockingbird"
              className="w-52 h-96 rounded-lg shadow-lg"
            />
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRT8Mnk9Wk_GK66jlGj-j8HPbgcUDh2p1ZO-TUCfRzKxxpLSuFl"
              alt="To Kill a Mockingbird"
              className="w-52 h-96 rounded-lg shadow-lg"
            />
                <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRk-ceHEoVFSczdfWZ_LItfuMbdbViq4jL7uqpqoHj9Z86eAbkl"
              alt="To Kill a Mockingbird"
              className="w-52 h-96 rounded-lg shadow-lg"
            />
                <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQLFFtRQybT035PZLJUlFryBFiWZAjxGvjblf0tDwJbpBIY5Gau"
              alt="To Kill a Mockingbird"
              className="w-52 h-96 rounded-lg shadow-lg"
            />
           
       </div>


        

     
      </section>

      {/* Parallax Book Collection Section */}
      <section className="relative py-16 bg-gray-100">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://5a929471-madman-com-au.akamaized.net/assets/images/backgrounds/first-visit/website-desktop-video-hold.jpg)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-teal-600 mb-8">
            Browse Our Collection
          </h2>
          {
            sessionStorage.getItem("token")?
            <Link className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500"       to={"/product"}   >
            Start Exploring
          </Link>
            :
            <Link className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500"       to={"/auth"}   >
            Start Exploring
          </Link>
          }
        </div>  

        
      </section>

      {/* Footer Section */}
      <Footer></Footer>

    </div>
  );
};

export default LandingPage;
