import styled from "styled-components";

interface EditModalProps {
  tag: string;
  handleDeleteTag: (selectedTag: string) => void;
}

const OneTag = ({ tag, handleDeleteTag }: EditModalProps) => {
  return (
    <S.TagItem>
      <h4>{tag}</h4>
      <S.Icon
        src="#"
        alt="태그 삭제 아이콘"
        onClick={() => {
          handleDeleteTag(tag);
        }}
      />
    </S.TagItem>
  );
};
export default OneTag;

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
  TagItem,
  Icon,
};
