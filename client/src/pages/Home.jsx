import React from "react";
import Navbar from "../components/Navbar";
import QuestionnaireSummary from "../components/QuestionnaireSummary";
import Intro from "../components/Intro";
import styled from "styled-components";

const BackgroundImage = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  opacity: 0.6;
  z-index: -2;
  background-image: url("https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
`;

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ position: "absolute", width: "100vw", paddingTop: "60px" }}>
        <BackgroundImage></BackgroundImage>
        <Intro></Intro>
        <QuestionnaireSummary></QuestionnaireSummary>
      </div>
    </>
  );
};

export default Home;
