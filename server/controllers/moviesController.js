const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const skip = parseInt(req.query.skip) || 0;

        const [movies, total] = await Promise.all([
            Movie.find()
                .sort({ popularity: -1 })
                .skip(skip)
                .limit(limit),
            Movie.countDocuments()
        ]);

        res.json({
            data: movies,
            total: total
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const searchMovies = (req, res) => {
    const title = req.query.title;
    if (!title) {
        return res.status(400).json({ error: 'Title query parameter is required' });
    }
    Movie.find({ title: { $regex: title, $options: 'i' } })
        .then(movies => {
            res.json(movies);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

module.exports = {
    getMovies,
    searchMovies
}