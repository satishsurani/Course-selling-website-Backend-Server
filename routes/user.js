const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");
const z = require('zod')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/jwtconfig')

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const email = req.body.email;
    const password = req.body.password;
    const user = z.object({
        email: z.string().email(),
        password: z.number().min(6)
    });
    const userSchema = user.safeParse({ 
        email: email,
        password: password
    }); 
    if(userSchema.success === false){
        res.json({
            msg: "invalid input"
        })
    }else{
        await User.create({
            email: email,
            password: password
        })
        const token = jwt.sign(email, jwtconfig);
        res.json(token)
        res.json({
            msg: "admin create successfully"
        })
    }
});

router.post('/signin', userMiddleware, (req, res) => {
    // Implement user signup logic
    res.json("sign in successfully")
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then(value => res.json(value))

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const email = req.headers.email;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid courseId format' });
    }

    await User.updateOne({ 
        email: email
    }, {
        "$push": { 
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});


router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const email = req.headers.email;
    const user = await User.findOne({ email: email })
    const courses = await Course.find({
         _id: { 
            '$in': user.purchasedCourses 
        }})
    res.json(courses)
});
 
module.exports = router 