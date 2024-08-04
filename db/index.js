const mongoose = require('mongoose');
const dburl = require('../config/dbconfig');


// Connect to MongoDB
mongoose.connect(dburl);



// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    email: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    email: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here 
    title: String,
    description: String,
    image: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}