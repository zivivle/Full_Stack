import styled from "styled-components";
import { flexRow } from "../../styles/common";

interface EditMainHeaderProps {
  setIsAddModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMainHeader = ({ setIsAddModalOpen }: EditMainHeaderProps) => {
  const handleAddModalOpen = () => {
    if (setIsAddModalOpen) {
      setIsAddModalOpen(true);
    }
  };
  return (
    <>
      <div>
        <S.EditHeaderContainer>
          <h2>Note</h2>
          <S.AddButton onClick={handleAddModalOpen}>+</S.AddButton>
        </S.EditHeaderContainer>
      </div>
    </>
  );
};
export default EditMainHeader;

const EditHeaderContainer = styled.div`
  width: 80vw;
  ${flexRow};
  justify-content: space-between;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.PALETTE["primary"]};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.PALETTE["secondary"]};
  }
`;

const AddButton = styled.button`
  background-color: ${({ theme }) => theme.PALETTE["accent"]};
  border: none;
  border-radius: 50%; /* 버튼 둥글게 */
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: ${({ theme }) => theme.PALETTE["primary"]};
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE["secondary"]};
    transform: scale(1.05); /* 호버 시 약간 확대 */
  }

  &:focus {
    outline: none;
  }
`;

const S = {
  EditHeaderContainer,
  AddButton,
};
