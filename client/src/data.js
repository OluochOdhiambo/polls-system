export const questions = [
  {
    id: 0,
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
    id: 1,
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

export const wards = {
  mavuria: [
    "Gichiche",
    "Mavuria",
    "Nyangwa",
    "Kithunthuri",
    "Gacegethiory",
    "Kombo Munyori",
    "Gikiiro",
  ],
  kiambere: ["Gacabari", "Kiambere", "Tharawe", "Kindaruma"],
  mbeti_south: ["Kirima", "Mbita", "Gachoka", "Kiamuringa", "Gachuriri"],
  makima: ["Makima", "Mwea Grazing", "Mbondoni"],
  mwea: ["Gategi", "Karaba", "Wachoro", "Riakanu"],
};
