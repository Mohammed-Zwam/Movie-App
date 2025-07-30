const User = require('../models/user');
const Movie = require('../models/Movie');

const toggleWatchList = async (req, res) => {
    const userId = req.userID;
    const movieId = req.params.movieId;
    try {
        const user = await User.findById(userId);
        const index = user.watchList.indexOf(movieId);
        if (index > -1) {
            user.watchList.splice(index, 1); // remove
        } else {
            user.watchList.push(movieId); // add
        }

        await user.save();
        res.json({ watchList: user.watchList });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user's watchList movies
const getWatchList = async (req, res) => {
    try {
        const user = await User.findById(req.userID).populate('watchList');
        let movies = await Movie.find({
            _id: { $in: user.watchList }
        });
        console.log(user);
        
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getWatchList,
    toggleWatchList
}