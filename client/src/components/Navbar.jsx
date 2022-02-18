import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Left = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;

const Logo = styled.h1``;

const Right = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-end;
  align-items: center;
`;

const LinkItem = styled.div`
  width: 10%;
  font-size: 16px;
  font-weight: 400;
  ${mobile({ width: "30%" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>
            <Link style={{ textDecoration: "none", color: "#111" }} to="/">
              Rainbow
            </Link>
          </Logo>
        </Left>
        <Right>
          {user ? (
            <LinkItem>
              <Link
                to="/logout"
                style={{
                  textDecoration: "none",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                Logout
              </Link>
            </LinkItem>
          ) : (
            <LinkItem>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                Login
              </Link>
            </LinkItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
