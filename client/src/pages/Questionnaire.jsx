import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Question from "../components/Question";
import { questions } from "../data";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-top: 60px;
  width: 95%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
width: 100%;
display flex;
justify-content: center;
align-items: center;
`;

const Button = styled.button`
  margin: 10px;
  height: 50px;
  width: 120px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Summary = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  height: 200px;
`;

const Subtitle = styled.h2``;

const Box = styled.div`
  width: 200px;
  margin: 10px;
  background: #fff;
`;

const Text = styled.div`
  background: #f1f1f1;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p``;

const Questionnaire = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionnaireRef = location.pathname.split("/")[2];
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [respondents, setRespondents] = useState([]);

  useEffect(() => {
    questionnaireRef &&
      setFilteredQuestions(
        questions.filter(
          (question) => question.questionnaireRef === questionnaireRef
        )
      );
  }, [questionnaireRef]);

  const getRespondents = async () => {
    try {
      const res = await userRequest.get(
        `/respondents?questionnaireRef=${questionnaireRef}`
      );
      setRespondents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRespondents();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>{questionnaireRef}</Title>
          <ButtonContainer>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/response/${questionnaireRef}`);
              }}
            >
              Administer Questionnaire
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/results/${questionnaireRef}`);
              }}
            >
              View Analysis
            </Button>
          </ButtonContainer>
          <Subtitle>Questions</Subtitle>
          {filteredQuestions &&
            filteredQuestions.map((question) => (
              <Question
                question={question}
                questionIndex={filteredQuestions.indexOf(question)}
                key={filteredQuestions.indexOf(question)}
              />
            ))}
          <Summary>
            <Box>
              <Subtitle>Question Count</Subtitle>
              <Text>
                <P>{filteredQuestions.length}</P>
              </Text>
            </Box>
            <Box>
              <Subtitle>Total Respondents</Subtitle>
              <Text>
                <P>{respondents.length}</P>
              </Text>
            </Box>
          </Summary>
        </Wrapper>
      </Container>
    </>
  );
};

export default Questionnaire;
