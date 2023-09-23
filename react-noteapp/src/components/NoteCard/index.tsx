import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { NoteDateType } from "../../types/noteDateTypes";
import { useDispatch } from "react-redux";
import {
  archiveNoteList,
  deleteNoteList,
  pinedNoteList,
} from "../../reducers/noteReducer";

interface CardContainerProps {
  backgroundColor?: string;
}

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

  function formatCurrentDate(note: { date: string }) {
    const now = new Date(note.date);
    // 년, 월, 일 포맷
    const year = now.getFullYear().toString().slice(-2); // 년도의 마지막 두 자리
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 1을 더해줌)
    const day = now.getDate().toString().padStart(2, "0"); // 일

    // 시간과 분 포맷
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours = hours - 12; // 12시간 형식으로 변경
    if (hours === 0) hours = 12; // 0시는 12AM

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }

  return (
    <>
      <S.CardContainer backgroundColor={note.backgroundColor}>
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
          <S.Timestamp>{formatCurrentDate(note)}</S.Timestamp>
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

const CardContainer = styled.div<CardContainerProps>`
  width: 25vw;
  height: 28vh;
  border: 1px solid #e0e0e0;
  background-color: ${(props) => props.backgroundColor};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
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
