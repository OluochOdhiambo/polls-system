const Question = require("../models/Question");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorized,
  verifyTokenAndAdmin,
  verifyTokenAndSup,
} = require("./verifyToken");

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion
    .save()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  await Question.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id)
    .then((resp) => res.status(200).json("Question has been deleted..."))
    .catch((err) => res.status(500).json(err));
});

//GET QUESTION
router.get("/find/:id", async (req, res) => {
  await Question.findById(req.params.id)
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(500).json(err));
});

//  GET ALL QUESTIONS
router.get("/", async (req, res) => {
  if (req.query.questionnaireRef) {
    await Question.find({
      questionnaireRef: req.query.questionnaireRef,
    })
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(500).json(err));
  } else {
    await Question.find()
      .then((resp) => res.status(200).json(resp))
      .catch((err) => res.status(500).json(err));
  }
});

module.exports = router;
