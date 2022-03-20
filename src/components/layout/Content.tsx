import styled from "styled-components";
import { Breakpoint } from "../../utils/breakpoint";

const ContentContainer = styled.div`
  padding: 0.5em;
  margin: auto;
  @media only screen and ${Breakpoint.XS} {
    width: 90%;
  }
  @media only screen and ${Breakpoint.SM} {
    width: 80%;
  }
  @media only screen and ${Breakpoint.LG} {
    width: 80%;
  }
  @media only screen and ${Breakpoint.XLG} {
    width: 60%;
  }
`;

interface ContentProps {
  children?: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return <ContentContainer>{children}</ContentContainer>;
};
