import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { mobile } from "../responsive";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { questions, wards } from "../data";
import { useLocation } from "react-router-dom";
import { addRespondent } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  overflow: hidden;
  position: absolute;
`;

const BackgroundImage = styled.div`
  position: fixed;
  width: 100vw;
  height: calc(100vh - 60px);
  opacity: 0.4;
  background-image: url("https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
`;

const Title = styled.h2`
  padding: 5px 20px;
  position: fixed;
  width: 100%;
  background: #f1f1f1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormInput = styled.input`
  background: #fff;
  width: 500px;
  margin: 5px 0;
  padding: 5px 0;
  ${mobile({ width: "100%", margin: "8px 0", padding: "8px 0" })}
`;

const RespondentDetails = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
`;

const Wrapper = styled.div`
  height: 100%;
  transition: all 1.5s ease;
  transform: translateY(${(props) => props.slideIndex * -100}%);
`;

const Complete = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ width: "100%" })}
`;

const Submit = styled.button`
  margin-top: 10px;
  ${mobile({ padding: "0 10px", height: "50px", width: "150px" })};
`;

const QuestionWrapper = styled.div`
  position: relative;
  padding: 0 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({ padding: "0 10px" })}
`;

const QuestionStatement = styled.h1`
  font-weight: 400;
`;

const Choices = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Options = styled.select`
  height: 40px;
  width: 500px;
  cursor: pointer;
  margin-left: 40px;
  background: #fff;
  ${mobile({ margin: "10px 20px" })}
`;

const FormOptions = styled.select`
  height: 40px;
  width: 500px;
  cursor: pointer;
  background: #fff;
  ${mobile({ width: "100%" })}
`;

const Option = styled.option`
  height: 40px;
  width: 300px;
  // margin: 5px 0;
  background-color: #f1f1f1;
  font-size: 24px;
  ${mobile({ width: "70%" })}
`;

const Scale = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border: 1px #999 solid;
  background: linear-gradient(to right, #f00, #ff0, #0f0);
`;

const RadioLabel = styled.label`
  display: flex;
  width: 70px;
  height: 50px;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  border-left: 1px #999 solid;
  transition: 0.3s;
  background: #fff;
  cursor: pointer;

  ${mobile({ width: "50px" })}
`;

const RadioChoices = styled.input`
  display: none;
`;

const TextAreaContainer = styled.div`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 10px;
  background: #fff;
`;

const NavigateSection = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 60px;
`;

const Scroll = styled.div`
  height: 100%;
  width: 40%;
  background-color: blue;
`;

const ScrollBtn = styled.button`
  height: 100%;
  width: 50%;
`;

const QuestionnaireForm = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [respondent, setRespondent] = useState({});
  const [choices, setChoices] = useState({});
  const [questionnaireResponse, setQuestionnaireResponses] = useState({});
  const [confirmedRespondent, setConfirmedRespondent] = useState(false);
  const [confirmedChoices, setConfirmedChoices] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const location = useLocation();
  const questionnaireRef = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    questionnaireRef &&
      setFilteredQuestions(
        questions.filter(
          (question) => question.questionnaireRef === questionnaireRef
        )
      );
  }, [questionnaireRef]);

  const handleClick = (direction) => {
    if (direction === "up") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(
        slideIndex < filteredQuestions.length - 1 ? slideIndex + 1 : slideIndex
      );
    }
  };

  const handleChange = (e) => {
    setRespondent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChoices = (e) => {
    if (slideIndex === filteredQuestions.length - 1) {
      setChoices((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
      setConfirmedChoices(true);
    } else {
      setChoices((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const confirm = (e) => {
    e.preventDefault();
    setConfirmedRespondent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRespondent = {
      ...respondent,
      responses: choices,
    };
    console.log(finalRespondent);
    // addRespondent(finalRespondent, dispatch);
  };

  return (
    <>
      <Navbar />
      <div style={{ position: "relative" }}>
        <BackgroundImage></BackgroundImage>
        <Container>
          <Title>Travel process questionnaire</Title>
          {!confirmedRespondent ? (
            <RespondentDetails>
              <Form method="POST">
                <label htmlFor="county">County</label>
                <FormOptions name="county" id="county" onChange={handleChange}>
                  <Option value="">---Select County---</Option>
                  <Option value="embu">Embu</Option>
                </FormOptions>
                <label htmlFor="subCounty">Sub-County</label>
                <FormOptions
                  name="subCounty"
                  id="subCounty"
                  onChange={handleChange}
                >
                  <Option value="">---Select SubCounty---</Option>
                  <Option value="mbeere south">Mbeere South</Option>
                </FormOptions>
                <label htmlFor="ward">Ward</label>
                <FormOptions name="ward" id="ward" onChange={handleChange}>
                  <Option value="">---Select Ward---</Option>
                  <Option value="kiambeere">Kiambeere</Option>
                  <Option value="mavuria">Mavuria</Option>
                  <Option value="mbeti-south">Mbeti South</Option>
                  <Option value="makima">Makima</Option>
                  <Option value="mwea">Mwea</Option>
                </FormOptions>
                <label htmlFor="subLocation">Sub-location</label>
                <FormOptions
                  name="subLocation"
                  id="subLocation"
                  onChange={handleChange}
                >
                  <Option value="">---Select Sublocation---</Option>
                  {respondent && respondent.ward === "mavuria"
                    ? wards.mavuria.map((sublocation) => (
                        <Option
                          key={wards.mavuria.indexOf(sublocation)}
                          value={sublocation}
                        >
                          {sublocation}
                        </Option>
                      ))
                    : respondent && respondent.ward === "kiambeere"
                    ? wards.kiambere.map((sublocation) => (
                        <Option
                          key={wards.kiambere.indexOf(sublocation)}
                          value={sublocation}
                        >
                          {sublocation}
                        </Option>
                      ))
                    : respondent && respondent.ward === "mwea"
                    ? wards.mwea.map((sublocation) => (
                        <Option
                          key={wards.mwea.indexOf(sublocation)}
                          value={sublocation}
                        >
                          {sublocation}
                        </Option>
                      ))
                    : respondent && respondent.ward === "makima"
                    ? wards.makima.map((sublocation) => (
                        <Option
                          key={wards.makima.indexOf(sublocation)}
                          value={sublocation}
                        >
                          {sublocation}
                        </Option>
                      ))
                    : wards.mbeti_south.map((sublocation) => (
                        <Option
                          key={wards.mbeti_south.indexOf(sublocation)}
                          value={sublocation}
                        >
                          {sublocation}
                        </Option>
                      ))}
                </FormOptions>
                <label htmlFor="gender">Gender</label>
                <FormOptions name="gender" id="gender" onChange={handleChange}>
                  <Option value="">---Select Gender---</Option>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </FormOptions>
                <label htmlFor="age">Age</label>
                <FormOptions name="age" id="age" onChange={handleChange}>
                  <Option value="">---Select Age range---</Option>
                  <Option value="below 35">Below 35</Option>
                  <Option value="mid">35 - 50</Option>
                  <Option value="above 50">Above 50</Option>
                </FormOptions>
                <button
                  style={{ marginTop: "10px", height: "30px", width: "200px" }}
                  onClick={confirm}
                >
                  PROCEED
                </button>
              </Form>
            </RespondentDetails>
          ) : !confirmedChoices ? (
            <Wrapper slideIndex={slideIndex}>
              {filteredQuestions &&
                filteredQuestions.map((question) => {
                  if (question.questionType === "multiple-choice") {
                    return (
                      <QuestionWrapper key={question.id}>
                        <QuestionStatement>
                          {filteredQuestions.indexOf(question) + 1}.{" "}
                          {question.question}?
                        </QuestionStatement>
                        <Choices>
                          <Options
                            onChange={handleChoices}
                            name={question.name}
                          >
                            <Option
                              value=""
                              style={{
                                display: "flex",
                                textAlign: "center",
                              }}
                            >
                              --:Select preferred candidate:--
                            </Option>
                            {question.responses &&
                              question.responses.map((response) => (
                                <Option
                                  key={question.responses.indexOf(response)}
                                  value={response}
                                >
                                  {response}
                                </Option>
                              ))}
                          </Options>
                        </Choices>
                      </QuestionWrapper>
                    );
                  } else if (question.questionType === "radio") {
                    return (
                      <QuestionWrapper key={question.id}>
                        <QuestionStatement>
                          {filteredQuestions.indexOf(question) + 1}.{" "}
                          {question.question}?
                        </QuestionStatement>
                        <Choices>
                          <Options
                            onChange={handleChoices}
                            name={question.name}
                          >
                            <Option value="">--- Select ---</Option>
                            {typeof question.responses[0] !== "object" ? (
                              question.responses &&
                              question.responses.map((response) => (
                                <Option
                                  key={question.responses.indexOf(response)}
                                  value={response}
                                >
                                  {response}
                                </Option>
                              ))
                            ) : typeof question.responses[0] === "object" &&
                              respondent.ward === "kiambeere" ? (
                              question.responses[0].kiambeere.map(
                                (response) => (
                                  <Option
                                    key={question.responses[0].kiambeere.indexOf(
                                      response
                                    )}
                                    value={response}
                                  >
                                    {response}
                                  </Option>
                                )
                              )
                            ) : typeof question.responses[0] === "object" &&
                              respondent.ward === "mavuria" ? (
                              question.responses[0].mavuria.map((response) => (
                                <Option
                                  key={question.responses[0].mavuria.indexOf(
                                    response
                                  )}
                                  value={response}
                                >
                                  {response}
                                </Option>
                              ))
                            ) : (
                              <></>
                            )}
                          </Options>
                        </Choices>
                      </QuestionWrapper>
                    );
                  } else if (question.questionType === "open-ended") {
                    return (
                      <QuestionWrapper key={question.id}>
                        <QuestionStatement>
                          {questions.indexOf(question) + 1}. {question.question}
                          ?
                        </QuestionStatement>
                        <TextAreaContainer>
                          <TextArea
                            rows="5"
                            onChange={handleChoices}
                            name={question.name}
                          ></TextArea>
                        </TextAreaContainer>
                      </QuestionWrapper>
                    );
                  } else if (question.questionType === "scale") {
                    return (
                      <QuestionWrapper key={question.id}>
                        <QuestionStatement>
                          {questions.indexOf(question) + 1}. {question.question}
                          ?
                        </QuestionStatement>
                        <Scale onChange={handleChoices}>
                          <RadioChoices
                            value="10"
                            type="radio"
                            name="rating"
                            id="rata10"
                          />
                          <RadioLabel htmlFor="rata10">10</RadioLabel>
                          <RadioChoices
                            value="9"
                            type="radio"
                            name="rating"
                            id="rata9"
                          />
                          <RadioLabel htmlFor="rata9">9</RadioLabel>
                          <RadioChoices
                            value="8"
                            type="radio"
                            name="rating"
                            id="rata8"
                          />
                          <RadioLabel htmlFor="rata8">8</RadioLabel>
                          <RadioChoices
                            value="7"
                            type="radio"
                            name="rating"
                            id="rata7"
                          />
                          <RadioLabel htmlFor="rata7">7</RadioLabel>
                          <RadioChoices
                            value="6"
                            type="radio"
                            name="rating"
                            id="rata6"
                          />
                          <RadioLabel htmlFor="rata6">6</RadioLabel>
                          <RadioChoices
                            value="5"
                            type="radio"
                            name="rating"
                            id="rata5"
                          />
                          <RadioLabel htmlFor="rata5">5</RadioLabel>
                          <RadioChoices
                            value="4"
                            type="radio"
                            name="rating"
                            id="rata4"
                          />
                          <RadioLabel htmlFor="rata4">4</RadioLabel>
                          <RadioChoices
                            value="3"
                            type="radio"
                            name="rating"
                            id="rata3"
                          />
                          <RadioLabel htmlFor="rata3">3</RadioLabel>
                          <RadioChoices
                            value="2"
                            type="radio"
                            name="rating"
                            id="rata2"
                          />
                          <RadioLabel htmlFor="rata2">2</RadioLabel>
                          <RadioChoices
                            value="1"
                            type="radio"
                            name="rating"
                            id="rata1"
                          />
                          <RadioLabel htmlFor="rata1">1</RadioLabel>
                        </Scale>
                      </QuestionWrapper>
                    );
                  }
                })}
            </Wrapper>
          ) : (
            <Complete>
              <h1 style={{ textAlign: "center" }}>
                Thank you for your feedback.
              </h1>
              <Submit onClick={handleSubmit}>Submit</Submit>
            </Complete>
          )}
        </Container>
      </div>
      <NavigateSection>
        <Scroll>
          <ScrollBtn>
            <KeyboardArrowUp onClick={() => handleClick("up")}>
              Previous
            </KeyboardArrowUp>
          </ScrollBtn>
          <ScrollBtn>
            <KeyboardArrowDown onClick={() => handleClick("down")}>
              Next
            </KeyboardArrowDown>
          </ScrollBtn>
        </Scroll>
      </NavigateSection>
    </>
  );
};

export default QuestionnaireForm;
