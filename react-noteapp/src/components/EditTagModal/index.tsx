import styled from "styled-components";

interface EditModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTagModal = ({ setIsModalOpen }: EditModalProps) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <S.ModalHeader>
          <h3>Edit Tags</h3>
          <S.Icon src="#" alt="창 종료 아이콘" onClick={handleCloseModal} />
        </S.ModalHeader>
        <S.TagInput placeholder="Tag 내용을 입력해주세요" />
        <S.TagItem>
          <h4>Exercise</h4>
          <S.Icon src="#" alt="태그 삭제 아이콘" />
        </S.TagItem>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
export default EditTagModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
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

const S = {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  TagInput,
  TagItem,
  Icon,
};
