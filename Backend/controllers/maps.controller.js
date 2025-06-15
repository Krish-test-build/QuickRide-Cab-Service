const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (err) {
        res.status(404).json({ message: 'Coordinates Not Found' });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapsService.getDistanceTime(origin, destination);

        let adjustedDuration = distanceTime.duration;
        if (adjustedDuration > 10) {
            adjustedDuration += 10;
        }

        const roundedDistance = Math.round(distanceTime.distance * 10) / 10;
        const roundedDuration = Math.round(adjustedDuration * 10) / 10;

        res.status(200).json({
            distance: `${roundedDistance} Km`,
            duration: `${roundedDuration} Minutes`
        });
    } catch (err) {
        res.status(404).json({ message: 'Route Not Found Between the 2 Areas' });
    }
};

module.exports.getAutoCompleteSuggestions=async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    try {
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);

       
        res.status(200).json(suggestions);
        
    } catch (err) {
        res.status(404).json({ message: 'Route Not Found Between the 2 Areas' });
    }
};