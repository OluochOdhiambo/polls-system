import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const QuestionWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuestionStatement = styled.h2`
  font-weight: 400;
`;

const Choices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Choice = styled.p``;

const Question = (props) => {
  console.log(props.responses);
  return (
    <QuestionWrapper>
      <QuestionStatement>
        {props.questionIndex + 1}. {props.question.question} ?
      </QuestionStatement>
      <Choices>
        {/* {props.question.responses.map((response) => (
          <Choice key={props.question.responses.indexOf(response)}>
            {response}
          </Choice>
        ))} */}
      </Choices>
    </QuestionWrapper>
  );
};

export default Question;
