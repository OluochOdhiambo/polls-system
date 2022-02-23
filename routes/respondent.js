const Respondent = require("../models/Respondent");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorized,
  verifyTokenAndAdmin,
  verifyTokenAndSup,
} = require("./verifyToken");

// CREATE
router.post("/", verifyTokenAndAuthorized, async (req, res) => {
  const newRespondent = new Respondent(req.body);
  await newRespondent
    .save()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//GET RESPONDENT
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  await Respondent.findById(req.params.id)
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(500).json(err));
});

//  GET ALL RESPONDENTS
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   if (req.query.questionnaireRef) {
//     await Respondent.find({
//       questionnaireRef: req.query.questionnaireRef,
//     })
//       .then((resp) => res.status(200).json(resp))
//       .catch((err) => res.status(500).json(err));
//   } else {
//     await Respondent.find()
//       .then((resp) => res.status(200).json(resp))
//       .catch((err) => res.status(500).json(err));
//   }
// });

//GET ALL RESPONDENTS
router.get("/", verifyTokenAndAuthorized, async (req, res) => {
  const qNew = req.query.new;
  const qRef = req.query.questionnaireRef;
  try {
    let respondents;

    if (qNew) {
      respondents = await Respondent.find().sort({ createdAt: -1 }).limit(1);
    } else if (qRef) {
      respondents = await Respondent.find({
        questionnaireRef: {
          $in: [qRef],
        },
      });
    } else {
      respondents = await Respondent.find();
    }

    res.status(200).json(respondents);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
