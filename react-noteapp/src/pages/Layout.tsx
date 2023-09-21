import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { flexRow } from "../styles/common";

const Layout = (): JSX.Element => {
  return (
    <>
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
    </>
  );
};

export default Layout;

const MainContainer = styled.div`
  ${flexRow}
`;

const S = {
  MainContainer,
};
