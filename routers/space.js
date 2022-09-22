const Space = require("../models").space;
const Story = require("../models").story;
const { Router } = require("express");
const router = new Router();

// GET all spaces
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send({ message: "List of spaces", data: spaces });
  } catch (e) {
    next(e);
  }
});

// GET space by id with stories
router.get("/spaces/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const theSpace = await Space.findByPk(spaceId, { include: [Story] });

    theSpace
      ? res.send({
          message: "Requested space data",
          data: theSpace,
        })
      : res.status(404).send("Space not found");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
