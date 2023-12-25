const { nanoid } = require('nanoid')
const URL = require('../models/urlModel')

exports.homepage = async (req, res) => {
    try{
        res.render('index')
    } catch(error) {
        res.status(500).send({
            message: error.message || "Error Occured"
        });
    }
}

exports.genShortURL = async (req, res) => {
    try{
        const body = req.body;
        if(!body.url) return res.status(400).json({
            error: 'url is required'
        })
        const shortID = nanoid(8).toLowerCase();
        const newUrl = await URL.create({
            shortId: shortID, 
            redirectURL: body.url,
            history: [],
        })
        // console.log(newUrl);
        return res.json({ 
            id: shortID
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.goToURL = async (req, res) => {
    try{
        const shortId = req.params.shortId
        const entry = await URL.findOneAndUpdate({
            shortId
        }, 
        { $push: {
            history: { timestamp: Date.now() }
            } 
        })
        // console.log(entry)
        res.redirect(entry.redirectURL)

    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.getAnalytics = async (req, res) => {
    try {
        const shortid = req.params.shortId
        const result = await URL.findOne({ shortId: shortid })
        // console.log(result)
        return res.json({
            totalClicks: result.history.length,
            analytics: result.history,
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}