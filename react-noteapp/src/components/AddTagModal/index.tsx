import styled from "styled-components";

import { flexCenter } from "../../styles/common";
import OneTag from "./components/one-tag/OneTag";
import { useAppSelector } from "../../hooks/useRedux";

interface AddTagModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTagModal = ({ setIsModalOpen, setTags }: AddTagModalProps) => {
  const tagData = useAppSelector((state) => state.tag);
  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <S.ModalHeader>
          <h3>Edit Tags</h3>
          <S.Icon
            src="#"
            alt="창 종료 아이콘"
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </S.ModalHeader>

        {tagData?.map((tag, index) => (
          <OneTag key={index} tag={tag} setTags={setTags} />
        ))}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
export default AddTagModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 300px;
  max-width: 80%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const TagItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonWrapper = styled.div`
  ${flexCenter}
`;

const BasicButton = styled.button`
  width: 10vw;
  margin-top: 20px;
  padding: 10px 0;
  background-color: #f7f7f7;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const S = {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  TagInput,
  TagItem,
  Icon,
  ButtonWrapper,
  BasicButton,
};
