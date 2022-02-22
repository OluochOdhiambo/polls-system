import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import BarGraph from "../components/BarGraph";
import { useLocation } from "react-router-dom";
import { questions } from "../data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Results = () => {
  const location = useLocation();
  const questionnaireRef = location.pathname.split("/")[2];
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    questionnaireRef &&
      setFilteredQuestions(
        questions.filter(
          (question) => question.questionnaireRef === questionnaireRef
        )
      );
  }, [questionnaireRef]);

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Title>{questionnaireRef}</Title>
        {filteredQuestions.map((question) => (
          <Wrapper key={filteredQuestions.indexOf(question)}>
            <BarGraph question={question}></BarGraph>
          </Wrapper>
        ))}
      </Container>
    </>
  );
};

export default Results;
