import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { adminproductsAPI, statusProjectAPI } from "../services/allapi";
import SERVER_URL from "../services/serverUrl";

const AdminDash = () => {
    const navigate = useNavigate();
    const [allbook, setAllbook] = useState([]);

    // Logout Function
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    // Fetch all books on component mount
    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = { Authorization: `Bearer ${token}` };
            try {
                const result = await adminproductsAPI(reqHeader);
                if (result.status === 200) {
                    setAllbook(result.data);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Function to handle book status update
    const handleEditBook = async (bookId, newStatus) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,            };

            try {
                const result = await statusProjectAPI(bookId, newStatus, reqHeader);
                if (result.status === 200) {
                    // alert("Book status updated successfully");

                    // Update the local state
                    const updatedBooks = allbook.map((book) =>
                        book._id === bookId ? { ...book, status: newStatus } : book
                    );
                    setAllbook(updatedBooks);
                } else {
                    alert("Failed to update book status");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            {/* Header Section */}
            <header className="bg-teal-500 text-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        Welcome, <span className="font-semibold">Admin</span>
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-blue-500  hover:bg-red-600 text-lg shadow-md transition-transform transform hover:scale-105 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                        <IoIosLogOut className="mr-1" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Books Table */}
            <div className="container mx-auto mt-5">
                <table className="table-auto  w-full border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Book Name</th>
                            <th className="px-4 py-2">Author</th>
                            <th className="px-4 py-2">Genre</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Language</th>
                            <th className="px-4 py-2">Publisher</th>
                            {/* <th className="px-4 py-2">Price</th> */}
                            <th></th>

                            <th className="px-4 py-2">Action / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        allbook?.length > 0 ? (
                            allbook.map((book, index) => (
                                <tr key={book._id} className="text-center border-t">
                                    <td className="px-4 py-2" style={{width:"200px" }}   
                                    > <img
                    src={`${SERVER_URL}/uploads/${book.productimg}`}
                    alt={book.title}
                    className="w-20 h-32 object-cover rounded-lg"
                    // style={{width:"100px"}}   
                    /></td>
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author}</td>
                                    <td className="px-4 py-2">{book.genre}</td>
                                    <td className="px-4 py-2">{book.description}</td>
                                    <td className="px-4 py-2">{book.language}</td>
                                    <td className="px-4 py-2">{book.publisher}</td>
                                    {/* <td className="px-4 py-2">{book.price}</td> */}
                                    <td>
                                        <a className=" text-wrap px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md"
                            href={book.link}> Read</a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-center space-x-2">
                                            {book.status === "Pending" ? (
                                                <>
                                                    <button
                                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                                        onClick={() =>
                                                            handleEditBook(book._id, "Approved")
                                                        }
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                                        onClick={() =>
                                                            handleEditBook(book._id, "Rejected")
                                                        }
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span
                                                    className={`px-4 py-2 rounded text-white ${
                                                        book.status === "Approved"
                                                            ? "bg-green-500  hover:bg-green-600 text-lg shadow-md transition-transform transform hover:scale-105"
                                                            : "bg-red-500"
                                                    }`}
                                                >
                                                    {book.status}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center text-red-500 font-semibold py-4"
                                >
                                    No Books Found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDash;
