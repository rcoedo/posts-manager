import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserMenu } from "./UserMenu";
import { Content } from "./Content";
import { theme } from "./theme";

const AppContainer = styled.div`
  a {
    color: ${(props) => props.theme.colors.accent};
  }

  input {
    padding: 1rem 0.5rem;
    font-size: 16px;
    border: 2px solid;
    border-radius: 5px;
  }

  input:focus {
    outline: none;
    box-shadow: 4px 4px 0px -1px ${(props) => props.theme.colors.accent};
  }

  input[type="text"]:focus {
    background-color: ${(props) => props.theme.colors.focusBg};
  }

  input:hover {
    cursor: pointer;
    box-shadow: 4px 4px 0px -1px ${(props) => props.theme.colors.accent};
  }

  *:focus {
    outline-color: ${(props) => props.theme.colors.accent};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template:
    "hd hd hd hd hd nv nv nv nv" 85px
    "content content content content content content content content content" minmax(500px, auto)
    "ft ft ft ft ft ft ft ft ft" 60px;
`;

const HeaderArea = styled.div`
  grid-area: hd;
`;

const UserMenuArea = styled.div`
  grid-area: nv;
`;

const ContentArea = styled.div`
  grid-area: content;
`;

const FooterArea = styled.div`
  grid-area: ft;
`;

export const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Grid>
          <HeaderArea>
            <Header />
          </HeaderArea>
          <UserMenuArea>
            <UserMenu />
          </UserMenuArea>
          <ContentArea>
            <Content>
              <Suspense fallback={<>loading...</>}>
                <Outlet />
              </Suspense>
            </Content>
          </ContentArea>
          <FooterArea>
            <Footer />
          </FooterArea>
        </Grid>
      </AppContainer>
    </ThemeProvider>
  );
};
