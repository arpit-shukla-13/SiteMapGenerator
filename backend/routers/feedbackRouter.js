const express = require('express');
const router = express.Router();
const Model = require('../models/feedbackModel');

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('profile')
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// getall
router.get('/getall', (req, res) => {
    Model.find().populate('user')
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    Model.findOne(req.body).populate('profile')
        .then((result) => {
            if (result) res.status(200).json(result);
            else res.status(400).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;