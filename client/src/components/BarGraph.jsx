import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { questions } from "../data";

const Container = styled.div`
  background: #87cefa;
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  width: 90%;
  height: 85%;
  position: relative;
`;

const Legend = styled.div`
  background: #f1f1f1;
  width: 180px;
  top: 0px;
  right: 10px;
  position: absolute;
  padding: 0 10px;
`;

const LegendTitle = styled.p`
  text-align: center;
  font-weight: 600;
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2px 0px;
`;

const LegendColor = styled.div`
  width: 10%;
  margin-right: 10px;
  background: ${(props) => props.color};
`;

const LegendText = styled.p`
  width: 80%;
`;

const LegendValue = styled.span`
  width: 10%;
`;

const Graph = styled.div`
  padding: 0 10px;
  height: 100%;
  background: white;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Bar = styled.div`
  max-width: 80px;
  min-width: 40px;
  height: ${({ percentage = 0 }) => percentage}%;
  background: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Labels = styled.div`
  padding: 0 10px;
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  height: 100%;
  writing-mode: vertical-lr;
  text-orientation: upright;
  text-align: center;
`;

const LabelID = styled.p`
  max-width: 80px;
  min-width: 40px;
  text-align: center;
  background: white;
`;

const BarGraph = (props) => {
  const location = useLocation();
  const questionnaireRef = location.pathname.split("/")[2];
  const [respondents, setRespondents] = useState([]);
  const [counterObject, setCounterObject] = useState({});
  const [questionNames, setQuestionNames] = useState([]);
  const [counterObjectFrequencies, setCounterObjectFrequencies] = useState({});

  const colors = [
    "#f37a4e",
    "#ea1162",
    "#19B278",
    "#3CBEC5",
    "#F6A85A",
    "#F1768B",
    "#C0C0C0",
    "#FFA07A",
    "#800080 ",
  ];

  const getRespondents = async () => {
    try {
      const res = await userRequest.get("/respondents");
      setRespondents(
        res.data.filter(
          (respondent) => respondent.questionnaireRef === questionnaireRef
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRespondents();
  }, [setRespondents]);

  const fetchResponses = () => {
    let counter = {};
    let combinedResponses = [];
    respondents?.forEach((respondent) => {
      setQuestionNames(Object.keys(respondent.responses));
      Object.keys(respondent.responses).forEach((role) => {
        let question = questions.filter((question) => question.name === role);
        counter[role] = {};
        let questionResponses = question[0].responses;
        let combinedResponses = [];
        if (typeof questionResponses[0] === "object") {
          for (let i = 0; i < questionResponses.length; i++) {
            Object.values(questionResponses[i]).forEach((valueSet) => {
              valueSet.forEach((value) => {
                combinedResponses.push(value);
              });
            });
          }
          combinedResponses.forEach((candidate) => {
            counter[role][candidate] = 0;
          });
        } else {
          question[0].responses.forEach((candidate) => {
            counter[role][candidate] = 0;
          });
        }
      });
    });
    setCounterObject(counter);
  };

  useEffect(() => {
    fetchResponses();
  }, [respondents]);

  const countResponses = () => {
    questionNames.length !== 0 &&
      Object.keys(counterObject).lengh !== 0 &&
      questionNames.forEach((name) => {
        respondents.forEach((respondent) => {
          let selectedCandidate = respondent.responses[name];
          if (selectedCandidate !== "not applicable") {
            counterObject[name][selectedCandidate] =
              counterObject[name][selectedCandidate] + 1;
          }
        });
      });
    setCounterObjectFrequencies(counterObject);
  };

  useEffect(() => {
    countResponses();
  }, [counterObject]);

  function toPercentages(obj) {
    let votes = Object.values(obj).reduce((a, b) => a + b);

    Object.keys(obj).forEach((questionName) => {
      obj[questionName] = (obj[questionName] / votes) * 100;
    });
  }

  useEffect(() => {
    if (counterObject !== {}) {
      let frequencyObject = {};
      Object.keys(counterObject).forEach((questionName) => {
        toPercentages(counterObject[questionName]);
      });
    }
  }, [counterObject]);

  return (
    <Container>
      <Title>{props.question.name} Results</Title>
      <GraphContainer>
        <Graph>
          <Legend>
            <LegendTitle>Legend</LegendTitle>
            {Object.keys(counterObject).length !== 0 &&
              typeof props.question.responses[0] !== "object" &&
              props.question.responses.map((response) => (
                <LegendItem key={props.question.responses.indexOf(response)}>
                  <LegendColor
                    color={colors[props.question.responses.indexOf(response)]}
                  ></LegendColor>
                  <LegendText>{response}</LegendText>
                  <LegendValue>
                    {Math.round(counterObject[props.question.name][response])}%
                  </LegendValue>
                </LegendItem>
              ))}
          </Legend>
          {Object.keys(counterObject).length !== 0 &&
            typeof props.question.responses[0] !== "object" &&
            props.question.responses.map((response) => (
              <Bar
                key={props.question.responses.indexOf(response)}
                percentage={counterObject[props.question.name][response]}
                color={colors[props.question.responses.indexOf(response)]}
              ></Bar>
            ))}
        </Graph>
      </GraphContainer>
      {/* <Labels>
        {props.question.responses.map((response) => (
          <LabelID key={props.question.responses.indexOf(response)}>
            {props.question.responses.indexOf(response) + 1}
          </LabelID>
        ))}
      </Labels> */}
    </Container>
  );
};

export default BarGraph;
