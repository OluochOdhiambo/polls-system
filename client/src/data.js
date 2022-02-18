export const questions = [
  {
    id: 1,
    name: "president",
    questionnaireRef: "presidential-polls",
    question:
      "If there was a general election tomorrow, which party would you vote for",
    questionType: "multiple-choice",
    responses: ["Ruto", "Raila", "Moi", "Mudavadi"],
  },
  {
    id: 2,
    name: "direction",
    questionnaireRef: "presidential-polls",
    question:
      "How do you feel about the general direction of our country at the moment",
    questionType: "multiple-choice",
    responses: [
      "Right direction",
      "Wrong direction",
      "Don't care",
      "I don't know",
    ],
  },
  {
    id: 3,
    name: "minAge",
    questionnaireRef: "presidential-polls",
    question: "Which of these issues is most important to you",
    questionType: "radio",
    responses: ["Economy", "Environment", "High taxes", "Education"],
  },
  {
    id: 4,
    name: "minAge",
    questionnaireRef: "presidential-polls",
    question: "What is your take on the recent fuel hike",
    questionType: "open-ended",
    responses: [],
  },
  {
    id: 5,
    name: "minAge",
    questionnaireRef: "presidential-polls",
    question: "How would you rate the performance of the previous regime",
    questionType: "scale",
    responses: [],
  },
  {
    id: 6,
    name: "minAge",
    questionnaireRef: "environmental-protection",
    question: "What do you think about environmental conservation efforts",
    questionType: "open-ended",
    responses: [],
  },
  {
    id: 7,
    name: "minAge",
    questionnaireRef: "environmental-protection",
    question: "How would you rate the performance of the previous regime",
    questionType: "scale",
    responses: ["Economy", "Environment", "High taxes", "Education"],
  },
  {
    id: 8,
    name: "employed",
    questionnaireRef: "child-abuse",
    question: "Have you ever employed children",
    questionType: "scale",
    responses: ["Yes", "No"],
  },
  {
    id: 9,
    name: "minAge",
    questionnaireRef: "child-abuse",
    question: "What is the minimum age of children",
    questionType: "open-ended",
    responses: [],
  },
  {
    id: 10,
    name: "MP",
    questionnaireRef: "mbeere-opinion-poll",
    question: "Who is your preferred Member of Parliament (MP)",
    questionType: "radio",
    responses: [
      "Geofrey King'ang'i",
      "Genesio Mugo",
      "Nerbert Muriuki",
      "Mutava Musyimi",
      "Jane Mbuthia",
      "Others",
    ],
  },
  {
    id: 11,
    name: "MCA",
    questionnaireRef: "mbeere-opinion-poll",
    question: "Who is your preferred Member of County Assembly (MCA)",
    questionType: "radio",
    responses: [
      {
        mavuria: ["Ngari Mbaka", "Wamawaiyu", "Judy", "Others"],
        kiambeere: [
          "Masters",
          "Chake",
          "Wachira Ikamba Ngoci",
          "Joseph Njue (msaniih)",
          "Others",
        ],
      },
    ],
  },
];

export const mainQuestions = [];

export const wards = {
  mavuria: ["Gichiche", "Mavuria", "Nyangwa", "Kithunthuri"],
  kiambere: ["Gacabari", "Kiambere", "Riachina"],
  mbeti_south: ["Kirima", "Mbita", "Gachoka", "Kiamuringa", "Gachuriri"],
  makima: ["Makima", "Mwea", "Mbondoni", "Riakanau"],
  mwea: ["Gategi", "Karaba", "Wachoro"],
};
