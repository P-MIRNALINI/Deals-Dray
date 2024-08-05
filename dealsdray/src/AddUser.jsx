import React, { useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddUser() {
    const [value, setValue] = useState({
        name: '',
        fathername: '',
        email: '',
        phone: '',
        designation: 'Select',
        gender: '',
        courses: [] // New courses field
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Handle checkboxes differently
        if (name === 'courses') {
            const isChecked = e.target.checked;
            const courseValue = e.target.value;

            setValue(prevState => ({
                ...prevState,
                courses: isChecked
                    ? [...prevState.courses, courseValue] // If checked, add course
                    : prevState.courses.filter(course => course !== courseValue) // If unchecked, remove course
            }));
        } else {
            setValue(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const CloseRef = useRef(); // Define CloseRef here

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adduser = await axios.post('http://localhost:8000/api/create', {
                ...value,
                designation: value.designation
            });
            const response = adduser.data;
            if (response.success) {
                toast.success(response.Message);
                CloseRef.current.click();
                setValue({
                    name: '',
                    fathername: '',
                    email: '',
                    phone: '',
                    designation: 'Select',
                    gender: '',
                    courses: [] // Reset courses field
                });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error('Failed to add user. Please try again.');
        }
    };

    return (
        <>
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Add Employee</h4>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-hidden="true" ref={CloseRef}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={value.name} name='name' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Father</label>
                                    <input type="text" value={value.fathername} name='fathername' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={value.email} name='email' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={value.phone} name='phone' onChange={handleOnChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <select value={value.designation} name='designation' onChange={handleOnChange} className="form-control" required >
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
                                                checked={value.gender === "Male"}
                                                onChange={handleOnChange}
                                            /> Male
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={value.gender === "Female"}
                                                onChange={handleOnChange}
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
                                                checked={value.courses.includes("MCA")}
                                                onChange={handleOnChange}
                                            /> MCA
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="courses"
                                                value="BCA"
                                                checked={value.courses.includes("BCA")}
                                                onChange={handleOnChange}
                                            /> BCA
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="courses"
                                                value="BSC"
                                                checked={value.courses.includes("BSC")}
                                                onChange={handleOnChange}
                                            /> BSC
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-bs-dismiss="modal" value="Cancel" />
                                <input type="submit" className="btn btn-primary" value="Add" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
