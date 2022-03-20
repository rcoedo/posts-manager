import styled from "styled-components";
import logo from "../../static/logo.svg";

const HeaderContainer = styled.div`
  padding: 1em;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="logo" />
    </HeaderContainer>
  );
};
