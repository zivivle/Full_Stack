import styled from "styled-components";
import { flexCenter } from "../../../../styles/common";

interface MainTabsProps {
  handleProductsFilter: (x: string) => void;
}

const MainTabs = ({ handleProductsFilter }: MainTabsProps): JSX.Element => {
  return (
    <>
      <S.TabsContainer>
        <S.Tab
          onClick={() => {
            handleProductsFilter("All");
          }}
        >
          모두
        </S.Tab>
        <S.Tab
          onClick={() => {
            handleProductsFilter("electronics");
          }}
        >
          전자기기
        </S.Tab>
        <S.Tab
          onClick={() => {
            handleProductsFilter("jewelery");
          }}
        >
          쥬얼리
        </S.Tab>
        <S.Tab
          onClick={() => {
            handleProductsFilter(`men's clothing`);
          }}
        >
          남성의류
        </S.Tab>
        <S.Tab
          onClick={() => {
            handleProductsFilter(`women's clothing`);
          }}
        >
          여성의류
        </S.Tab>
      </S.TabsContainer>
    </>
  );
};

export default MainTabs;

const TabsContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  ${flexCenter}
  div {
    margin-right: 40px;
  }
`;

const Tab = styled.div`
  padding: 10px 60px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d6d6d6;
  }
`;

const S = {
  TabsContainer,
  Tab,
};
