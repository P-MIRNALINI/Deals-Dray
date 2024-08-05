import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdatedUser() {
    const { id } = useParams(); // Extracting the user ID from the URL params

    const [userData, setUserData] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: '',
        designation: '',
        gender: '',
        courses: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('Fetching user with ID:', id);
                const userResponse = await axios.get(`http://localhost:8000/api/user/${id}`);
                const user = userResponse.data;
                console.log('Response from API:', user);
                setUserData(user); // Set data to user
            } catch (error) {
                console.log('Error fetching user data:', error);
                // Set default empty values for user data
                setUserData({
                    name: '',
                    fathername: '',
                    email: '',
                    phone: '',
                    designation: '',
                    gender: '',
                    courses: []
                });
            }
        }
        if (id) {
            fetchData();
        }
    }, [id]); // Add id to the dependency array to refetch data when id changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/update/${id}`, userData);
            // Redirect or show a success message after updating
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" value={userData.name} name='name' onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" value={userData.fathername} name='fathername' onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={userData.email} name='email' onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" value={userData.phone} name='phone' onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <select value={userData.designation} name='designation' onChange={handleChange} className="form-control" required >
                                <option value="Select">Select</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={userData.gender === "Male"}
                                        onChange={handleChange}
                                    /> Male
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={userData.gender === "Female"}
                                        onChange={handleChange}
                                    /> Female
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Courses</label>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="courses"
                                        value="MCA"
                                        checked={userData.courses && userData.courses.includes("MCA")}
                                        onChange={handleChange}
                                    /> MCA
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="courses"
                                        value="BCA"
                                        checked={userData.courses && userData.courses.includes("BCA")}
                                        onChange={handleChange}
                                    /> BCA
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="courses"
                                        value="BSC"
                                        checked={userData.courses && userData.courses.includes("BSC")}
                                        onChange={handleChange}
                                    /> BSC
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
