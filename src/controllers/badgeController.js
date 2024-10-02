const model = require("../models/badgeModel.js");

module.exports.createNewBadge = (req, res, next) => {

    const {name, description, attributes, rarity} = req.body;

    if (!name || !description || !rarity || !attributes ) {
        res.sendStatus(400);
        return;
    }
    const data = {name, description, attributes, rarity}; 

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewBadge:", error);
            res.status(500).json(error);
        } else {
            req.params.badge_id = results.insertId;
            next();
        }
    };
    model.createBadge(data, callback);

}

module.exports.readAllBadges = (req, res) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getAllBadges:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };
    model.readAllBadges(callback);
}

module.exports.readBadgeById= (req, res) => {
    const {badge_id} = req.params;

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getBadgeById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results[0]);
        }
    };
    model.readBadgeById(badge_id, callback);
}

module.exports.updateBadgeById = (req, res,next) => {
    const {badge_id} = req.params;
    const {name, description, attributes, rarity} = req.body;
    if (!name || !description || !attributes || !rarity  ) {
        res.sendStatus(400);
        return;
    }
    const data = {name, description,  attributes, rarity, badge_id};

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateBadgeById:", error);
            res.status(500).json(error);
        } else {

            if(results.affectedRows == 0) {
                res.sendStatus(404);
            } else {
                req.params.badge_id = data.badge_id;
                next();
            }
        }
    };
    model.updateBadgeById(data, callback);
}

module.exports.deleteBadgeById = (req, res) => {
    const {badge_id} = req.params;
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteBadgeById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    };
    model.deleteBadgeById(badge_id, callback);
}


