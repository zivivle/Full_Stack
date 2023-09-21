import styled from "styled-components";
import { flexRow } from "../../styles/common";

const SubMainHeader = ({ field }: { field: string }) => {
  return (
    <>
      <div>
        <S.SubHeaderContainer>
          <h2>{field}</h2>
        </S.SubHeaderContainer>
      </div>
    </>
  );
};
export default SubMainHeader;

const SubHeaderContainer = styled.div`
  width: 80vw;
  ${flexRow};
  padding: 15px 20px 21.5px 20px;
  background-color: ${({ theme }) => theme.PALETTE["primary"]};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.PALETTE["secondary"]};
  }
`;

const S = {
  SubHeaderContainer,
};
