"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Story #1",
          content:
            "I started writing an album and it took me more than a year to finish first song",
          imageUrl:
            "https://blog.reverbnation.com/wp-content/uploads/2021/04/5-misconceptions-about-making-music.jpg",
          spaceId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Story #2",
          content:
            "I have fun studying at Codaisseur. Its not easy, but I see the progrees and learn alot.",
          imageUrl:
            "https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/426/original/codaisseur-square.png",
          spaceId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "story from Steven",
          content:
            "Today I drove the bike and sun was shining so I got some icecream and chilled on the lakeshore",
          imageUrl:
            "https://cdns-images.dzcdn.net/images/cover/9a76177a402f94f0417d6c04ee24c14d/500x500.jpg",
          spaceId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Puma and the mouse",
          content: "Meew catch the mouse meewwww, yummy!!",
          imageUrl:
            "https://media.istockphoto.com/photos/cat-playing-with-little-gerbil-mouse-on-thetable-picture-id507209918?k=20&m=507209918&s=612x612&w=0&h=g8FhyzVznVrYFYX5qcGgzZmDc1-9ue8SH_w8n_pEJfo=",
          spaceId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stories");
  },
};
