import React from "react";
import Navbar from "../components/Navbar";
import QuestionnaireSummary from "../components/QuestionnaireSummary";
import Intro from "../components/Intro";

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Intro></Intro>
      <QuestionnaireSummary></QuestionnaireSummary>
    </>
  );
};

export default Home;
