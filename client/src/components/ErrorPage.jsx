import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.h2`
  text-align: center;
`;

const ErrorPage = () => {
  return (
    <Container>
      <Wrapper>
        <Error>You do not have permission to view this page. Go back!</Error>
      </Wrapper>
    </Container>
  );
};

export default ErrorPage;
