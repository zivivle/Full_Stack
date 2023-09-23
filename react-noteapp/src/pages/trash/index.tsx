import SubMainHeader from "../../components/Headers/SubMainHeader";
import Nav from "../../components/Nav";
import styled from "styled-components";
import { flexColumn, flexRow } from "../../styles/common";
import NoteCard from "../../components/NoteCard";
import { useEffect, useState } from "react";
import { NoteDateType } from "../../types/noteDateTypes";
import { useAppSelector } from "../../hooks/useRedux";

const Trash = (): JSX.Element => {
  const noteData = useAppSelector((state) => state.note);
  const [deleteNotes, setDeleteNotes] = useState<NoteDateType[]>([]);

  useEffect(() => {
    const filteredDeleteNotes = noteData.filter(
      (note) => note.deleteData === true
    );
    setDeleteNotes(filteredDeleteNotes);
  }, [noteData]);

  return (
    <>
      <Nav />
      <S.Content>
        <SubMainHeader field={"Trash"} />
        <S.NotesSection>
          <S.NoteCardWrapper>
            {deleteNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </S.NoteCardWrapper>
        </S.NotesSection>
      </S.Content>
    </>
  );
};
export default Trash;

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
