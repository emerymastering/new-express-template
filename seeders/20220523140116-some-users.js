"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Denis",
          email: "apple@apple.com",
          phone: 1234567,
          password: bcrypt.hashSync("apple", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Steven",
          email: "banana@banana.com",
          phone: 1234567,
          password: bcrypt.hashSync("banana", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Puma",
          email: "coco@coco.com",
          phone: 1234567,
          password: bcrypt.hashSync("coco", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
