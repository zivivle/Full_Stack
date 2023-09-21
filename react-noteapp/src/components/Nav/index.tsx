import styled from "styled-components";
import { flexColumn, flexRow } from "../../styles/common";
import { useNavigate } from "react-router-dom";

interface NavProps {
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ setIsModalOpen }: NavProps) => {
  const navigate = useNavigate();

  const handleModalState = () => {
    if (setIsModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleNavigate = (field: string) => {
    navigate(field);
  };
  return (
    <>
      <S.MainContainer>
        <S.Header>
          <h1>Keep</h1>
          <S.Line />
        </S.Header>
        <div>
          <S.NavContainer
            onClick={() => {
              handleNavigate("/");
            }}
          >
            <img src="#" alt="❗️" />
            <h2>Note</h2>
          </S.NavContainer>
          <S.NavContainer onClick={handleModalState}>
            <img src="#" alt="♫" />
            <h2>Edit Notes</h2>
          </S.NavContainer>
          <S.NavContainer
            onClick={() => {
              handleNavigate("/archive");
            }}
          >
            <img src="#" alt="⍞" />
            <h2>Archive</h2>
          </S.NavContainer>
          <S.NavContainer
            onClick={() => {
              handleNavigate("/trash");
            }}
          >
            <img src="#" alt="🗑️" />
            <h2>Trash</h2>
          </S.NavContainer>
        </div>
      </S.MainContainer>
    </>
  );
};
export default Nav;

const MainContainer = styled.div`
  width: 20vw;
  height: 100vh;
  background-color: #ffe69b;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
`;

const NavContainer = styled.div`
  ${flexRow}
  padding: 12px 16px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE["accent"]};
    cursor: pointer;
  }

  img {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }

  h2 {
    color: ${({ theme }) => theme.PALETTE["white"]};
    font-weight: 900;
    margin: 0;
  }
`;

const Header = styled.div`
  ${flexColumn}
  justify-content: space-between;
  padding: 12px 16px;
  h1 {
    color: ${({ theme }) => theme.PALETTE["white"]};
    font-size: 28px;
    margin: 5px 0px 17px 0px;
    font-weight: 900;
  }
`;

const Line = styled.div`
  width: 100%; /* 원래의 100%에서 60%로 줄임 */
  height: 1.5px; /* 선의 두께 조절 */
  background-color: ${({ theme }) => theme.PALETTE["white"]};
  margin: 0 auto; /* 중앙 정렬 */
`;

const S = {
  MainContainer,
  NavContainer,
  Header,
  Line,
};
