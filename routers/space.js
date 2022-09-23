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

// POST a new story to space with corresponding `id`
router.post("/:id/stories", auth, async (req, res) => {
  const space = await Space.findByPk(req.params.id);
  console.log(space);

  if (space === null) {
    return res.status(404).send({ message: "This space does not exist" });
  }

  if (!space.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
  }

  const { name, imageUrl, content } = req.body;

  if (!name) {
    return res.status(400).send({ message: "A story must have a name" });
  }

  const story = await Story.create({
    name,
    imageUrl,
    content,
    spaceId: space.id,
  });

  return res.status(201).send({ message: "Story created", story });
});

module.exports = router;
