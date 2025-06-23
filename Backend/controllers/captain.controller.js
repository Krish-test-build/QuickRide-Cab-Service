const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain Already Exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        },
        socketID: null
    });

    const token = await captain.generateAuthToken();

    res.status(201).json({ token, captain });
};


module.exports.loginCaptain = async (req, res, next) => {
    console.log("🔐 loginCaptain controller called");
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("⚠️ Validation errors:", errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        console.log("📨 Login credentials received for:", email);

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            console.log("❌ No captain found with email:", email);
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            console.log("❌ Incorrect password for:", email);
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(
            captain._id,
            { socketID: null },
            { new: true }
        );

        console.log("✅ Captain authenticated. ID:", updatedCaptain._id);

        const token = await updatedCaptain.generateAuthToken();
        res.cookie('token', token);

        const safeCaptain = {
            _id: updatedCaptain._id,
            email: updatedCaptain.email,
            fullName: updatedCaptain.fullName
        };

        return res.status(200).json({ token, captain: safeCaptain });
    } catch (err) {
        console.error("❗ Error during login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization.split(' ')[1]);
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: "Logged out" });
};
