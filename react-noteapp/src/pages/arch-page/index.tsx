import { useSelector } from "react-redux";
import SubMainHeader from "../../components/Headers/SubMainHeader";
import Nav from "../../components/Nav";
import NoteCard from "../../components/NoteCard";
import { RootState } from "../../types/reduxTypes";
import { useEffect, useState } from "react";
import { NoteDateType } from "../../types/noteDateTypes";
import { flexColumn, flexRow } from "../../styles/common";
import styled from "styled-components";

const ArchivePage = (): JSX.Element => {
  const noteData = useSelector((state: RootState) => state.note);
  const [archiveNotes, setArchiveNotes] = useState<NoteDateType[]>([]);

  useEffect(() => {
    const filterdNotes = noteData.filter((note) => note.archive === true);
    const filterdDeleteNotes = filterdNotes.filter(
      (note) => note.deleteData === false
    );
    setArchiveNotes(filterdDeleteNotes);
  }, [noteData]);

  return (
    <>
      <Nav />
      <S.Content>
        <SubMainHeader field={"Archive"} />
        <S.NotesSection>
          <S.NoteCardWrapper>
            {archiveNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </S.NoteCardWrapper>
        </S.NotesSection>
      </S.Content>
    </>
  );
};
export default ArchivePage;

const Content = styled.div`
  ${flexColumn}
  padding: 15px;
`;

const NotesSection = styled.div`
  margin: 15px 0px;
`;

const NoteCardWrapper = styled.div`
  ${flexRow}
  margin-left: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const S = {
  Content,
  NotesSection,
  NoteCardWrapper,
};
