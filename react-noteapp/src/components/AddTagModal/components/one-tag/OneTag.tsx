import styled from "styled-components";

interface EditModalProps {
  tag: string;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const OneTag = ({ tag, setTags }: EditModalProps) => {
  const handleTadUpdate = () => {
    setTags((prev) => {
      if (prev.includes(tag)) {
        return prev;
      }
      return [...prev, tag];
    });
  };
  console.log("tag", tag);

  return (
    <S.TagItem>
      <h4>{tag}</h4>
      <S.Icon src="#" alt="플러스 아이콘" onClick={handleTadUpdate} />
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
