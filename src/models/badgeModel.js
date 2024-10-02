const pool = require("../services/db");

module.exports.createBadge = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Badge(name, description, attributes, rarity)
        VALUES (?,?,?,?);
        `;
    const VALUES = [data.name, data.description, JSON.stringify(data.attributes), data.rarity];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.readAllBadges = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Badge;
        `;

    pool.query(SQLSTATEMENT, callback);
}

module.exports.readBadgeById = (Item_id, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Badge
        WHERE badge_id = ?;
        `;
    const VALUES = [Badge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateBadgeById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Badge
        SET name = ?, description = ?, attributes = ?, rarity = ?
        WHERE badge_id = ?;
        `;
    const VALUES = [data.name, data.description,JSON.stringify(data.attributes), data.rarity,data.badge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteBadgeById = (Badge_id, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Badge
        WHERE badge_id = ?;
        ALTER TABLE Badge AUTO_INCREMENT = 1;
        `;
    const VALUES = [Badge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

