const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const z = require("zod")
const { Admin, Course } = require("../db");
const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/jwtconfig')

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
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
        await Admin.create({
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

router.post('/signin', adminMiddleware, async (req, res) => {
    // Implement admin signup logic
    res.json("sign in successfully")
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const price = req.body.price;
    await Course.create({ 
        title: title, 
        description: description, 
        image: image, 
        price: price 
    });
    res.json("course create successfully")
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then(value => res.json(value))
});

module.exports = router;