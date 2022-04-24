import React from "react";
import styled from "@emotion/styled";

const StyledText = styled.h1`
  color: white;
  font-family: hongaria;
  font-size: 5em;
  text-shadow: 3px 5px 20px #1f2397;
`;

const StyledHeader = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledText>Cloud Gaming</StyledText>
    </StyledHeader>
  );
};

export default Header;
