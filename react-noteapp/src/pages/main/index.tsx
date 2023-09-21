import EditMainHeader from "../../components/Headers/EditMainHeader";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import styled from "styled-components";
import { flexColumn, flexRow } from "../../styles/common";
import NoteCard from "../../components/NoteCard";
import AddNoteModal from "../../components/AddNoteModal";
import FilterModal from "../../components/FilterModal";
import { useSelector } from "react-redux";
import { RootState } from "../../types/reduxTypes";
import { NoteDateType } from "../../types/noteDateTypes";
import EditTagModal from "../../components/EditTagModal";
import EditNoteModal from "../../components/EditNoteModal";

const Main = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [pined, setPined] = useState<boolean>(false);
  const [archive, setArchive] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [pinedNote, setPinedNote] = useState<NoteDateType[]>([]);
  const [unPinedNote, setUnPinedNote] = useState<NoteDateType[]>([]);
  const [selectedEditNote, setSelectedEditNote] = useState("");

  const noteData = useSelector((state: RootState) => state.note);
  console.log("noteData", noteData);
  console.log("selectedEditNote", selectedEditNote);

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  useEffect(() => {
    const filteredPinedNotes = noteData.filter((note) => note.pined === true);
    const filteredPinedUnArchiveNotes = filteredPinedNotes.filter(
      (note) => note.archive === false
    );
    const filteredDeletePinedUnArchiveNotes =
      filteredPinedUnArchiveNotes.filter((note) => note.deleteData === false);
    setPinedNote(filteredDeletePinedUnArchiveNotes);
    const filteredUnPinedNotes = noteData.filter(
      (note) => note.pined === false
    );
    const filteredUnPinedUnArchiveNotes = filteredUnPinedNotes.filter(
      (note) => note.archive === false
    );
    const filteredDeleteUnPinedUnArchiveNotes =
      filteredUnPinedUnArchiveNotes.filter((note) => note.deleteData === false);
    setUnPinedNote(filteredDeleteUnPinedUnArchiveNotes);
  }, [noteData]);

  return (
    <S.Container>
      <Nav setIsModalOpen={setIsModalOpen} />
      {isEditModalOpen ? (
        <EditNoteModal
          setIsEditModalOpen={setIsEditModalOpen}
          selectedEditNote={selectedEditNote}
        />
      ) : null}
      {isFilterModalOpen ? (
        <FilterModal setIsFilterModalOpen={setIsFilterModalOpen} />
      ) : null}
      {isAddModalOpen ? (
        <AddNoteModal
          setIsAddModalOpen={setIsAddModalOpen}
          pined={pined}
          archive={archive}
          tags={tags}
          deleteData={deleteData}
        />
      ) : null}
      {isModalOpen ? <EditTagModal setIsModalOpen={setIsModalOpen} /> : null}
      <div>
        <EditMainHeader setIsAddModalOpen={setIsAddModalOpen} />
        <S.Content>
          <S.SearchBar>
            <S.SearchInput placeholder="노트의 제목을 입력해주세요" />
            <S.FilterButton onClick={handleFilterModalOpen}>
              filter
            </S.FilterButton>
          </S.SearchBar>
          <S.NotesSection>
            <S.NotesTitle>Pinned Notes ({pinedNote?.length})</S.NotesTitle>
            <S.NoteCardWrapper>
              {pinedNote?.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  setIsEditModalOpen={setIsEditModalOpen}
                  setSelectedEditNote={setSelectedEditNote}
                />
              ))}
            </S.NoteCardWrapper>
          </S.NotesSection>
          <S.NotesSection>
            <S.NotesTitle>All Notes ({unPinedNote?.length})</S.NotesTitle>
            <S.NoteCardWrapper>
              {unPinedNote?.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  setIsEditModalOpen={setIsEditModalOpen}
                  setSelectedEditNote={setSelectedEditNote}
                />
              ))}
            </S.NoteCardWrapper>
          </S.NotesSection>
        </S.Content>
      </div>
    </S.Container>
  );
};
export default Main;

const Container = styled.div`
  ${flexRow}
`;

const Content = styled.div`
  padding: 15px;
`;

const SearchBar = styled.div`
  ${flexColumn}
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-right: 10px;
`;

const FilterButton = styled.button`
  width: 5vw;
  font-weight: bold;
  padding: 10px 15px;
  margin: 20px 10px 0px 0px;
  color: ${({ theme }) => theme.PALETTE["primary"]};
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  border: none;
  border-radius: 5px;
  align-self: flex-end;
  &:hover {
    background-color: ${({ theme }) => theme.PALETTE["secondary"]};
    transform: scale(1.05); /* 호버 시 약간 확대 */
  }

  &:focus {
    outline: none;
  }
`;

const NotesSection = styled.div`
  margin-bottom: 30px;
`;

const NotesTitle = styled.h3`
  padding-bottom: 10px;
`;

const NoteCardWrapper = styled.div`
  ${flexRow}
  margin-left: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const S = {
  Container,
  Content,
  SearchBar,
  SearchInput,
  FilterButton,
  NotesSection,
  NotesTitle,
  NoteCardWrapper,
};
