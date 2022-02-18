import React from "react";
import styled from "styled-components";
import analytics from "../assets/images/analytics.png";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vw;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  height: 100%;
  background: cream;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background: #f1f1f1;
  border-radius: 20px;
  ${mobile({ width: "100%", margin: "10px 0px" })}
`;

const Title = styled.h1`
  text-align: center;
`;

const InfoText = styled.p``;

const ImageContainer = styled.div`
  width: 50%;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  border-radius: 20px;
  ${mobile({ width: "100%", margin: "10px 0px" })}
`;

const Feature = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const FeatureComponent = styled.div`
  flex: 1;
  border-bottom: 1px solid #dbd7d2;
`;

const FeatureTitle = styled.h2`
  cursor: pointer;
`;

const Image = styled.img`
  height: 350px;
  width: 350px;
  ${mobile({ display: "none" })}
`;

const Button = styled.button`
  width: 150px;
  height: 60px;
  margin: 10px;
  background: gray;
  color: #fff;
  border-style: none;
  border-radius: 20px;
  box-shadow: 8px 5px 5px #b2beb5;
  pointer: cursor;
`;

const Intro = () => {
  return (
    <Container>
      <Wrapper>
        <Info>
          <Title>Diversity is our strength</Title>
          <Button>Get Started</Button>
        </Info>
        <ImageContainer>
          <Title>Features</Title>
          <Feature>
            <Description>
              <FeatureComponent>
                <FeatureTitle>
                  <Link to="/accounts">Manage User Accounts</Link>
                </FeatureTitle>
                <InfoText>
                  Create multiple accounts enumerator and supervisor accounts
                  for your research team
                </InfoText>
              </FeatureComponent>
              <FeatureComponent>
                <FeatureTitle>
                  <Link to="/questionnaires">Custom survey</Link>
                </FeatureTitle>
                <InfoText>
                  Design custom survey forms and questions to suit your research
                </InfoText>
              </FeatureComponent>
              <FeatureComponent>
                <FeatureTitle>
                  <Link to="/reports">Data Analytics</Link>
                </FeatureTitle>
                <InfoText>Get quick analysis reports for your surveys</InfoText>
              </FeatureComponent>
            </Description>
            <Image src={analytics} alt=""></Image>
          </Feature>
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default Intro;
