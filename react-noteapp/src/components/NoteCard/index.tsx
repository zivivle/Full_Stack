import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { NoteDateType } from "../../types/noteDateTypes";
import { useDispatch } from "react-redux";
import {
  archiveNoteList,
  deleteNoteList,
  pinedNoteList,
} from "../../stroe/store";

interface NoteCardProps {
  note: NoteDateType;
  setIsEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEditNote?: React.Dispatch<React.SetStateAction<string>>;
}
const NoteCard = ({
  note,
  setIsEditModalOpen,
  setSelectedEditNote,
}: NoteCardProps) => {
  const dispatch = useDispatch();

  const handleDeleteNotes = (note: NoteDateType) => {
    dispatch(deleteNoteList(note.id));
  };
  const handlePinNote = (note: NoteDateType) => {
    dispatch(pinedNoteList(note.id));
  };

  const handleArchiveNote = (note: NoteDateType) => {
    dispatch(archiveNoteList(note.id));
  };

  const handleSelectedEditId = (note: NoteDateType) => {
    if (setIsEditModalOpen) {
      setIsEditModalOpen(true);
    }
    if (setSelectedEditNote) {
      setSelectedEditNote(note.id);
    }
  };

  return (
    <>
      <S.CardContainer>
        <S.Header>
          <S.Title>{note.title}</S.Title>
          <S.SubTitle>
            <S.Priority>{note.priority}</S.Priority>
            <S.PinIcon
              src="#"
              alt="핀 아이콘"
              onClick={() => handlePinNote(note)}
            />
          </S.SubTitle>
        </S.Header>
        <S.Content>{note.content}</S.Content>
        <S.Tags>
          {note.tags?.map((tag) => (
            <S.Tag>{tag}</S.Tag>
          ))}
        </S.Tags>
        <S.Footer>
          <S.Timestamp>{note.date}</S.Timestamp>
          <S.Actions>
            <S.Icon
              src="#"
              alt="작성 아이콘"
              onClick={() => {
                handleSelectedEditId(note);
              }}
            />
            <S.Icon
              src="#"
              alt="스크랩 아이콘"
              onClick={() => handleArchiveNote(note)}
            />
            <S.Icon
              src="#"
              alt="쓰레기통 아이콘"
              onClick={() => {
                handleDeleteNotes(note);
              }}
            />
          </S.Actions>
        </S.Footer>
      </S.CardContainer>
    </>
  );
};
export default NoteCard;

const CardContainer = styled.div`
  width: 25vw;
  height: 28vh;
  border: 1px solid #e0e0e0;
  background-color: pink;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #ffd1d9;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h6`
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const SubTitle = styled.div`
  ${flexRow}
`;

const Priority = styled.p`
  font-size: 12px;
  color: black;
  margin: 0;
  font-weight: bold;
`;

const PinIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 20px;
`;

const Content = styled.div`
  margin: 12px 0px 20px 0px;
  font-size: 12px;
  color: #555;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
`;

const Tag = styled.div`
  padding: 4px 8px;
  background-color: #f7f7f7;
  border-radius: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const Timestamp = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const S = {
  CardContainer,
  Header,
  Title,
  SubTitle,
  Priority,
  PinIcon,
  Content,
  Tags,
  Tag,
  Footer,
  Timestamp,
  Actions,
  Icon,
};
