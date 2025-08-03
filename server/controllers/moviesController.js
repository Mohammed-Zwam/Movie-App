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

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
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

const getRecommendations = async (req, res) => {
    try {
        const { genres } = req.query;

        if (!genres) {
            return res.status(400).json({ error: 'Genres query parameter is required' });
        }

        
        const genreIds = genres.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

        if (genreIds.length === 0) {
            return res.status(400).json({ error: 'Valid genre IDs are required' });
        }

        // Find movies that share at least one genre
        const recommendations = await Movie.find({
            genre_ids: { $in: genreIds }
        })
            .sort({ vote_average: -1, popularity: -1 }) 
            .limit(12); 

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMovies,
    getMovieById,
    getRecommendations, 
    searchMovies
}