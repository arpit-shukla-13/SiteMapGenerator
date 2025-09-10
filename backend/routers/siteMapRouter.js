const express = require('express');
const router = express.Router();
const Model = require('../models/sitemapModel');
const fs = require('fs');
const generateSitemap = require('../crawler');

function slugify(str) {
    return str.replace(/[\/:]/g, '_');
}
const getOutputDirectory = (url) => {
    return `output/${slugify(url)}`;
}


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

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})

router.get('/getbyuser/:id', (req, res) => {
    Model.find({ user: req.params.id })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result)
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        });
})

router.post('/generate', (req, res) => {
    const { url } = req.body;
    console.log(url);
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    if (fs.existsSync(getOutputDirectory(url))) {
        console.log('sitemap exists');
        res.status(200).json({ outputDir: getOutputDirectory(url).split('/')[1] });
    } else {
        generateSitemap(url)
            .then((result) => {
                console.log(result);
                res.status(200).json({ outputDir: result.split('/')[1] });
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
})

module.exports = router;