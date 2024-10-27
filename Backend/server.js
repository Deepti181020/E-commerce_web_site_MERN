const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


app.use(express.json());
app.use(cors());

// Correctly calling mongoose.connect()
mongoose.connect("mongodb+srv://deeptilata18:Deeptilata18%40%23@cluster0.oqmbz.mongodb.net/e-commerce")
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection error: ", error));


//Test for Express API creation 
app.get("/", (req, res) => {
    res.send("Express App is running successfull");

})

// Ensure the upload directory exists
// const uploadDir = './upload/images';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }



//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {

        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);

    }
})

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 5 },
});

//Create upload Endpoint
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },

})

//Upload the data into the schema called Product
app.post('/addproduct', async (req, res) => {
    //Automatically increse the id number of products

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        // available: req.body.available,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    //Response into the frontend

    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creating API for deleting the products

app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            message: "Product is deleted successfully",
            name: req.body.name,
        });

    } catch (error) {
        console.error("Error : ", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove the product",
        });

    }

});

//Creating API for getting all Products From the database

app.get('/allproducts', async (req, res) => {
    try {
        let products = await Product.find({});
        console.log("Data fetched from the collection/model");
        res.send(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while fetching products" });
    }

});
//Schema for users model

const Users = mongoose.model('Users', {
    name: {
        type: String,

    },
    email: {
        type: String,
        unique: true,

    },
    password: {
        type: String,

    },
    role:{
        type:"String",
        enum:['user','admin'],
        default:'user',
    },
    cartData: {
        type: Object,

    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//Creating API and Endpoint for registering the user
app.post('/signup', [
    body('username').notEmpty().withMessage('Username cannot be empty.'),
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        let check = await Users.findOne({ email: req.body.email })
        if (check) {
            return res.status(400).json({
                success: false,
                errors: "User has already an existing account"
            });
        }
        let cart = {};
        for (let index = 0; index < 300; index++) {
            cart[index] = 0;

        }
        // Hah the password before store in to the data base
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
        });
        console.log(user);
        await user.save();
        console.log("Saved");

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
        console.log("Generated token payload:", data); 
        res.json({
            success: true,
            message: "Registration successful",
            token: token,
        });
    } catch (error) {

        console.error('Error during signup', error);
        res.status(500).json({
            success: false,
            errors: 'An error occured during signing up.Please try again later'
        })

    }


})

//Creating API endpoint for user login

//Creating API endpoint for user login
app.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').notEmpty().withMessage('Password cannot be empty.')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array() // Validation errors for bad requests
        });
    }

    try {
        // Check if user exists in the database
        let user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials. Please check your email and password.' // User not found
            });
        }

        // Compare provided password with stored hashed password
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials. Please check your email and password.' // Incorrect password
            });
        }

        // Create payload for JWT
        const data = {
            user: { id: user.id }
        };

        // Generate JWT token (ensure JWT_SECRET is in your environment variables)
        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
        console.log("Generated token is :",token);
        

        // Respond with success and the JWT token
        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        // Handle any server errors
        res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again later." // Unified error message
        });
    }
});

app.post('/admin/signup', [
    body('username').notEmpty().withMessage('Username cannot be empty.'),
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
],async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    let cart = {};
        for (let index = 0; index < 300; index++) {
            cart[index] = 0;
        }

    try {
        let check = await Users.findOne({ email: req.body.email })
        if (check) {
            return res.status(400).json({
                success: false,
                errors: "Admin has already an existing account"
            });

        }
        // Hah the password before store in to the data base
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart,
            role:'admin',
        });
        console.log(user);
        await user.save();
        console.log("Saved");

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom', { expiresIn: '1h' });
        console.log("Generated token payload:", data); 
        res.json({
            success: true,
            message: "Registration successful",
            token: token,
        });
    } catch (error) {

        console.error('Error during signup', error);
        res.status(500).json({
            success: false,
            errors: 'An error occured during signing up.Please try again later'
        })

    }


})


app.post('/admin/login', [
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('password').notEmpty().withMessage('Password cannot be empty.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        // Check if admin user exists
        const admin = await Users.findOne({ email: req.body.email, role: 'admin' });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Admin credentials are invalid.'
            });
        }

        // Compare provided password with hashed password
        const passCompare = await bcrypt.compare(req.body.password, admin.password);
        if (!passCompare) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials. Please check your email and password.'
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { user: { id: admin.id, role: admin.role } },
            process.env.JWT_SECRET || 'secret_ecom',
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            message: "Admin login successful"
        });
    } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during admin login. Please try again later."
        });
    }
});



//Creating API endpoint for newcollection data
app.get('/newcollections', async (req, res) => {

    let products = await Product.find({});
    let newcollections = products.slice(1).slice(-8);
    console.log("new collection test");
    res.send(newcollections);

})

//Creating API endpoint for popular in women category
app.get('/popular-women', async (req, res) => {
    let products = await Product.find({ category: "Women" })
    let popular_women = products.slice(0, 4);
    console.log('Popular women data is fetched');
    res.send(popular_women);

})
//Creating a middleware to add the cart item quantitity in to the authenticate user cart object

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Could not find the token.Please authenticate with valid user!" })
    }
    else {
        try {

            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Token can not be decoded" });
        }
    }
}



//Creating API endpoint for adding products in to the cart

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log(req.body, req.user);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.json({ message: "Item is added", cartData: userData.cartData });

})

//Creating an API endpoint for romve cart item

app.post('/removecart', fetchUser, async (req, res) => {
    console.log("remove CartId", req.body.itemId);

    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {

        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.json({ message: "Item is removed", cartData: userData.cartData });

})

//Create an API endpoint for fetching the user's cart data

app.get('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json({ message: "The User's cartData quantity is", cartData: userData.cartData })

})


// Creating a schema for user addresses
const UserAddress = mongoose.model('UserAddress', {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true // Make sure this is required
    },
    address: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ errors: "Token not provided. Please authenticate." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_ecom');
        console.log('Decoded token:', decoded); // Log the decoded token to verify its structure

        // Access the ID via decoded.user.id
        req.user = decoded.user;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ errors: "Invalid token structure. User ID is missing." });
        }

        next();
    } catch (error) {
        res.status(401).json({ errors: "Invalid or expired token." });
    }
};

// Create API endpoint for adding addresses
app.post('/addaddress', verifyToken, async (req, res) => {
    const { address, locality, city, district, state, zipCode, phone } = req.body;

    try {
        // Add console logs to debug `req.user.id` before saving the address
        console.log('User ID for address creation:', req.user.id);

        const newAddress = new UserAddress({
            userId: req.user.id, // Associate address with logged-in user
            address,
            locality,
            city,
            district,
            state,
            zipCode,
            phone
        });

        await newAddress.save(); // Save the address to the database
        res.status(201).json({ message: 'Address added successfully', newAddress });
    } catch (error) {
        console.error('Error on saving address:', error.message);
        res.status(500).json({ message: 'Error on saving address', error: error.message });
    }
});

// Get addresses for the logged-in user
app.get('/view-address', verifyToken, async (req, res) => {
    console.log('Fetching addresses for user ID:', req.user.id);
    try {
        const addresses = await UserAddress.find({ userId: req.user.id }); // Fetch addresses for the logged-in user

        if (!addresses.length) {
            return res.status(404).json({ message: 'No addresses found for this user.' });
        }

        res.json({ message: "User's addresses retrieved successfully.", addresses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching addresses', error: error.message });
    }
});

// Update address by ID for the logged-in user
app.put('/edit-address/:id', verifyToken, async (req, res) => {
    const addressId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedAddress = await UserAddress.findOneAndUpdate(
            { _id: addressId, userId: req.user.id }, // Match userId to ensure ownership
            updatedData, 
            { new: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found or not authorized to edit this address' });
        }

        res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
});

// Delete an address for the logged-in user
app.delete('/delete-address/:id', verifyToken, async (req, res) => {
    const addressId = req.params.id;

    try {
        const deletedAddress = await UserAddress.findOneAndDelete({
            _id: addressId,
            userId: req.user.id, // Ensure the address belongs to the logged-in user
        });

        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found or not authorized to delete this address' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting address', error: error.message });
    }
});




app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on  port: " + port);

    }
    else {
        console.log("Eroor : " + error);
    }
})

