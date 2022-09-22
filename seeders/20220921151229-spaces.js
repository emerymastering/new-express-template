"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Emery Space",
          description: "Welcome to Emery music space",
          backgroundColor: "#00FF00",
          color: "#0000FF",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Steve Space",
          description: "Welcome to world of games",
          backgroundColor: "#FFFF00",
          color: "#0000FF",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: "My cats Space",
          description: "Welcome to meeeeww",
          backgroundColor: "#FFFF00",
          color: "#0000FF",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("spaces");
  },
};
