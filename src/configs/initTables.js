const pool = require("../services/db");

const bcrypt = require("bcrypt");
//uuid
const {v4: uuidv4} = require('uuid');
const user1_id = uuidv4();
const user2_id = uuidv4();

const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
};

bcrypt.hash("12345678", saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS User;

CREATE TABLE User (
    user_id CHAR(36) NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    points INT,
    PRIMARY KEY (user_id),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS quest;
CREATE TABLE quest (
    quest_id int NOT NULL AUTO_INCREMENT,
    title text,
    description text,
    difficulty_level varchar(20),
    reward_points int,
    reward_badge_id int,
    PRIMARY KEY (quest_id),
    KEY quest_reward_badge_id_id_badge_badge_id (reward_badge_id),
    CONSTRAINT quest_reward_badge_id_id_badge_badge_id FOREIGN KEY (reward_badge_id) REFERENCES badge (badge_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS badge;
CREATE TABLE badge (
    badge_id int NOT NULL AUTO_INCREMENT,
    name text,
    description text,
    attributes text,  -- Can store a JSON string representing attributes (e.g., criteria to earn badge)
    rarity varchar(20),
    PRIMARY KEY (badge_id)
);

DROP TABLE IF EXISTS user_quest;
CREATE TABLE user_quest (
    user_quest_id int NOT NULL AUTO_INCREMENT,
    user_id CHAR(36) NOT NULL,
    quest_id INT,
    completed BOOLEAN,
    PRIMARY KEY (user_quest_id),
    KEY uq_user_id_id_user_user_id (user_id),
    KEY uq_quest_id_id_quest_quest_id (quest_id),
    CONSTRAINT uq_quest_id_id_quest_quest_id FOREIGN KEY (quest_id) REFERENCES quest (quest_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS task;
CREATE TABLE task (
    task_id int NOT NULL AUTO_INCREMENT,
    quest_id int DEFAULT NULL,
    description text,
    points int DEFAULT NULL,
    PRIMARY KEY (task_id),
    KEY task_quest_id_id_quest_quest_id (quest_id),
    CONSTRAINT task_quest_id_id_quest_quest_id FOREIGN KEY (quest_id) REFERENCES quest (quest_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS taskprogress;
CREATE TABLE taskprogress (
    progress_id int NOT NULL AUTO_INCREMENT,
    user_id CHAR(36) NOT NULL,
    task_id int NOT NULL,
    completion_date timestamp NULL DEFAULT NULL,
    notes text,
    PRIMARY KEY (progress_id),
    KEY tp_user_id_id_user_user_id (user_id),
    KEY tp_task_id_id_task_task_id (task_id),
    CONSTRAINT tp_task_id_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT tp_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

DROP TABLE IF EXISTS MESSAGE;

CREATE TABLE MESSAGE (
    message_id int NOT NULL AUTO_INCREMENT,
    title text,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id CHAR(36) NOT NULL,
    message text,
    PRIMARY KEY (message_id),
    KEY m_user_id_id_user_user_id (user_id),
    CONSTRAINT m_user_id_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO User (user_id, username, email, password, points)
VALUES
    ('${user1_id}', 'admin', 'a@a.com', '${hash}', 0),
    ('${user2_id}', 'rest', 'rest@gmail.com', '${hash}', 0);

INSERT INTO MESSAGE (title, user_id, message)
VALUES
    ('Message 1 From User 1', '${user1_id}', 'This is the first message for User 1.'),
    ('Message 1 from User 2', '${user2_id}', 'Another message for User 1.'),
    ('Message 2 from User 1', '${user1_id}', 'Yet another message for User 1.'),
    ('Message 2 from User 2', '${user2_id}', 'Adding another message for User 1.'),
    ('Message 3 from User 2', '${user2_id}', 'More content for User 1.'),
    ('Message 3 from User 1', '${user1_id}', 'User 1 receives another message.');

-- Insert dummy data into the 'badge' table
INSERT INTO badge (name, description, attributes, rarity)
VALUES
    ('Tree Planter', 'Awarded for planting a significant number of trees.', '{"criteria": "plant 10 trees"}', 'Common'),
    ('Recycling Champion', 'For setting up a recycling initiative in the community.', '{"criteria": "establish recycling program"}', 'Uncommon'),
    ('Composting Expert', 'Recognized for creating a successful compost system.', '{"criteria": "set up composting system"}', 'Rare'),
    ('Solar Installer', 'Awarded for helping to install solar panels.', '{"criteria": "install solar panels on 5 houses"}', 'Legendary');

-- Insert dummy data into the 'quest' table
INSERT INTO quest (title, description, difficulty_level, reward_points, reward_badge_id)
VALUES
    ('Plant a Forest', 'Plant a certain number of trees in designated areas.', 'Medium', 100, 1),
    ('Start a Recycling Initiative', 'Set up a community recycling program.', 'Hard', 150, 2),
    ('Compost Organic Waste', 'Create a compost system in your community.', 'Medium', 75, 3),
    ('Install Solar Panels', 'Help install solar panels in your neighborhood.', 'Hard', 200, 4),
    ('Reduce Plastic Use', 'Create awareness on reducing plastic usage.', 'Easy', 50, 1),
    ('Clean Up the Beach', 'Organize a beach cleanup event.', 'Medium', 80, 2);

-- Insert dummy data into the 'task' table
INSERT INTO task (quest_id, description, points)
VALUES
    (1, 'Plant 10 trees in the park.', 30),
    (1, 'Engage 5 community members in tree planting.', 25),
    (2, 'Gather recyclable materials from 10 households.', 20),
    (2, 'Set up 3 recycling bins around the neighborhood.', 30),
    (3, 'Collect organic waste from 5 households for composting.', 25),
    (3, 'Build a compost bin for community use.', 20),
    (4, 'Help install solar panels on 5 houses.', 40),
    (4, 'Raise awareness about the benefits of solar energy.', 35),
    (5, 'Distribute flyers about reducing plastic use.', 10),
    (5, 'Organize a workshop on alternatives to plastic.', 15),
    (6, 'Recruit volunteers for a beach cleanup.', 20),
    (6, 'Collect and sort trash on the beach.', 30);
`;
        pool.query(SQLSTATEMENT, callback);
    }
});