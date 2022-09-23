const Space = require("../models").space;
const Story = require("../models").story;
const { Router } = require("express");
const router = new Router();
const auth = require("../auth/middleware");

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
router.get("/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);
    const theSpace = await Space.findByPk(spaceId, {
      // ordering: newwest comes first
      order: [[Story, "createdAt", "DESC"]],
      include: [Story],
    });

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

router.delete("/stories/:storyId", auth, async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const story = await Story.findByPk(storyId, { include: [Space] });
    if (!story) {
      return res.status(404).send("Story not found");
    }

    // Check if this user is the owner of the space
    if (story.space.userId !== req.user.id) {
      return res.status(401).send("You're not authorized to delete this story");
    }

    await story.destroy();

    res.send({ message: "ok", storyId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
