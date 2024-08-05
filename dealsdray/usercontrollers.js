import UserModel from "./User.js";

// Create user API
const create = async (req, res) => {
    try {
        const { name, fathername, email, phone, designation, gender, courses } = req.body; // Destructure gender and courses from req.body
        const newUser = new UserModel({ // Create a new user document
            name,
            fathername,
            email,
            phone,
            designation,
            gender, // Include the gender field
            courses // Include the courses field
        });
        await newUser.save(); // Save the new user document to the database
        res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// Read users API
const get = async (req, res) => {
    try {
        const users = await UserModel.find().select('-__v'); // Exclude version field
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// Update user API
const Updated = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User updated successfully", user: updateUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete user API
const Delete = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await UserModel.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { create, get, Updated, Delete };
