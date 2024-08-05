import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Table.css";

export default function Table({ Deletuser, UpdatedUser }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userResponse = await axios.get('http://localhost:8000/api/get');
                const users = userResponse.data.users;
                console.log('Response from API:', users);
                setData(users); // Set data to users
    
                // Log courses, gender, and designation immediately after setting data
                users.forEach(user => {
                    console.log('Courses:', user.courses);
                    console.log('Gender:', user.gender);
                    console.log('Designation:', user.designation);
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    
    

    // Function to delete a user
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete/${userId}`);
            // Filter out the deleted user from the data state
            setData(data.filter(user => user._id !== userId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Manage <b>Employees</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/add-user" className="btn btn-success">
                                <i className="material-icons"></i> <span>Add New Employee</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Father</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Designation</th>
                            <th>Gender</th> 
                            <th>Courses</th> 
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((elem, index) => (
                            <tr key={elem._id}> 
                                <td>{index + 1}</td>
                                <td>{elem.name}</td>
                                <td>{elem.fathername}</td>
                                <td>{elem.email}</td>
                                <td>{elem.phone}</td>
                                <td>{elem.designation}</td> 
                                <td>{elem.gender}</td> 
                                <td>{elem.courses && elem.courses.length > 0 ? elem.courses.join(', ') : '-'}</td>
                                <td>
                                    <Link to={`/update-user/${elem._id}`} className="edit cursor-pointer">
                                        <i className="material-icons" data-bs-toggle="tooltip" title="Edit"></i>
                                    </Link>
                                    <a href="#" className="delete cursor-pointer" onClick={() => handleDelete(elem._id)}>
                                        <i className="material-icons" data-bs-toggle="tooltip" title="delete"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
