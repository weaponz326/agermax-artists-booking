const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Artist = require('../models/Artist');
const EventOrganizer = require('../models/EventOrganizer');
const Admin = require('../models/Admin');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
        });

        if (user) {
            if (role === 'artist') {
                await Artist.create({
                    firstName,
                    lastName,
                    contactEmail: email,
                    // other fields if required
                });
            } else if (role === 'organizer') {
                await EventOrganizer.create({
                    firstName,
                    lastName,
                    contactEmail: email,
                    // other fields if required
                });
            } else if (role === 'admin') {
                await Admin.create({
                    firstName,
                    lastName,
                    contactEmail: email,
                    role,
                });
            }

            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
