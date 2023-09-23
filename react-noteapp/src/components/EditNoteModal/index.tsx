import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NoteDateType } from "../../types/noteDateTypes";
import { editNoteList, editNoteTagDelete } from "../../reducers/noteReducer";
import { useAppSelector } from "../../hooks/useRedux";
import { deleteTag } from "../../reducers/tagReducer";

interface EditNoteModalProps {
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEditNote: string;
}
const EditNoteModal = ({
  setIsEditModalOpen,
  selectedEditNote,
}: EditNoteModalProps) => {
  const [filteredNoteData, setFilteredNoteData] = useState<NoteDateType | null>(
    null
  );
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("white");
  const [priority, setPriority] = useState<string>("low");
  const dispatch = useDispatch();

  const noteData = useAppSelector((state) => state.note);

  useEffect(() => {
    const selectData = noteData.filter((note) => note.id === selectedEditNote);
    console.log("selectData", selectData);
    if (selectData.length > 0) {
      const selectedNote = selectData[0];
      setFilteredNoteData(selectedNote);
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setBackgroundColor(selectedNote.backgroundColor);
      setPriority(selectedNote.priority);
    }
  }, [noteData, selectedEditNote]);

  const handleAddModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditNote = () => {
    const chageNote: NoteDateType = {
      id: filteredNoteData?.id || "",
      title: title,
      content: content,
      date: filteredNoteData?.date || "",
      editDate: new Date().toString(),
      backgroundColor: backgroundColor,
      priority: priority,
      tags: filteredNoteData?.tags || [],
      pined: filteredNoteData?.pined || false,
      archive: filteredNoteData?.archive || false,
      deleteData: filteredNoteData?.deleteData || false,
    };
    dispatch(editNoteList(chageNote));
  };

  const handleDeleteTag = (tag: string) => {
    dispatch(editNoteTagDelete({ noteId: selectedEditNote, tag }));
  };

  return (
    <S.ModalWrapper>
      <S.ModalContainer>
        <S.TitleContainer>
          <h5>노트 생성하기</h5>
          <img src="/img/hello.png" alt="닫기" onClick={handleAddModalClose} />
        </S.TitleContainer>
        <S.Editor>
          <input
            placeholder="제목을 입력하세요..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <S.ToolbarContainer>
            <S.ToolbarGroup>
              <img src="/img/hello.png" alt="번호 달기" />
              <img src="/img/hello.png" alt="점 달기" />
            </S.ToolbarGroup>
            <S.ToolbarGroup>
              <img src="/img/hello.png" alt="이태릭체" />
              <img src="/img/hello.png" alt="폰트 바텀 라인" />
              <img src="/img/hello.png" alt="폰트 센터 라인" />
            </S.ToolbarGroup>
            <S.ToolbarGroup>
              <img src="/img/hello.png" alt="이미지 업로드" />
              <img src="/img/hello.png" alt="인용문" />
              <img src="/img/hello.png" alt="코드" />
            </S.ToolbarGroup>
          </S.ToolbarContainer>
          <textarea
            placeholder="내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </S.Editor>
        {filteredNoteData?.tags.map((tag) => (
          <>
            <div>{tag}</div>
            <button
              onClick={() => {
                handleDeleteTag(tag);
              }}
            >
              x
            </button>
          </>
        ))}
        <S.Options>
          <S.BasicButton>Add Tag</S.BasicButton>
          <S.SelectBox>
            <p>배경색</p>
            <select
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            >
              <option value="white">White</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
            </select>
          </S.SelectBox>
          <S.SelectBox>
            <p>우선순위</p>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </S.SelectBox>
        </S.Options>
        <S.SubmitButton onClick={handleEditNote}>수정하기</S.SubmitButton>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
};
export default EditNoteModal;

const S = {
  ModalWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  ModalContainer: styled.div`
    width: 50vw;
    padding: 20px;
    border: 1px solid #e0e0e0;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  `,
  TitleContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      margin-bottom: 10px;
    }
    img {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-bottom: 10px;
    }
  `,
  Editor: styled.div`
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
      padding: 5px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
    }

    textarea {
      padding: 10px;
      height: 200px;
      border: 1px solid #e0e0e0;
      border-radius: 0px 0px 5px 5px;
    }
  `,
  SelectBox: styled.div`
    ${flexRow}
    p {
      margin: 5px 5px 0px 0px;
    }
  `,
  Options: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    select {
      border: 1px solid #e0e0e0;
      padding: 4px 6px;
      border-radius: 5px;
      background-color: #f7f7f7;
      font-size: 0.9rem;
      transition: all 0.3s;

      &:hover {
        border-color: #c7c7c7;
      }

      &:focus {
        border-color: #a0a0a0;
        outline: none;
      }
    }
  `,

  BasicButton: styled.button`
    width: 10%;
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
  `,
  SubmitButton: styled.button`
    width: 100%;
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
  `,
  ToolbarContainer: styled.div`
    border: 1px solid #e0e0e0;
    padding: 5px 10px;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    flex-direction: row;
    gap: 40px;
    border-bottom: none;
  `,
  ToolbarGroup: styled.div`
    display: flex;
    gap: 10px;
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: opacity 0.3s;
      border-radius: 4px;
    }
    img:hover {
      opacity: 0.7;
    }
  `,
};
