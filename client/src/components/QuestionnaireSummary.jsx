import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { questions } from "../data";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  width: 95%;
  padding: 20px 0;
  background: #c5c6d0;
  border-radius: 20px;
  ${mobile({ width: "100%", margin: "0 10px" })}
`;

const Title = styled.h2``;

const QuestionWrapper = styled.div`
  display: flex;
  min-height: 60px;
`;

const Element = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Hr = styled.hr`
  margin: 0 10px;
`;

const ButtonContainer = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 5px;
  background: #f1f1f1;
  height: 40px;
  width: 100px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const QuestionnaireSummary = () => {
  const [questionnaireRefs, setQuestionnaireRefs] = useState([]);
  const [respondents, setRespondents] = useState([]);
  const navigate = useNavigate();

  const getUniqueQuestionnaires = (arr) => {
    const questionnaireRefSet = new Set();
    arr.forEach((question) =>
      questionnaireRefSet.add(question.questionnaireRef)
    );
    let refsArray = Array.from(questionnaireRefSet);
    setQuestionnaireRefs(refsArray);
  };

  const getRespondents = async () => {
    try {
      const res = await userRequest.get("/respondents");
      setRespondents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUniqueQuestionnaires(questions);
    getRespondents();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Available Questionnaires</Title>
        <div>
          <QuestionWrapper>
            <Element style={{ fontWeight: "650" }}>Question Ref</Element>
            <Element style={{ fontWeight: "650" }}>Question Count</Element>
            <Element style={{ fontWeight: "650" }}>Total Repondents</Element>
            <ButtonContainer></ButtonContainer>
          </QuestionWrapper>
          <Hr />
        </div>
        {questionnaireRefs &&
          questionnaireRefs.map((ref) => (
            <div key={questionnaireRefs.indexOf(ref)}>
              <QuestionWrapper>
                <Element>{ref}</Element>
                <Element>{questions.length}</Element>
                <Element>
                  {
                    respondents.filter(
                      (response) => response.questionnaireRef === ref
                    ).length
                  }
                </Element>
                <ButtonContainer>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/questionnaires/${ref}`);
                    }}
                  >
                    View
                  </Button>
                </ButtonContainer>
              </QuestionWrapper>
              <Hr />
            </div>
          ))}
      </Wrapper>
    </Container>
  );
};

export default QuestionnaireSummary;
