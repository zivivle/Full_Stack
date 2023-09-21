import "draft-js/dist/Draft.css"; // 기본 스타일
import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { NoteDateType } from "../../types/noteDateTypes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNoteList } from "../../stroe/store";
interface AddNoteModalProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pined: boolean;
  archive: boolean;
  tags: string[];
  deleteData: boolean;
}
const AddNoteModal = ({
  setIsAddModalOpen,
  pined,
  archive,
  tags,
  deleteData,
}: AddNoteModalProps) => {
  const dispatch = useDispatch();

  const handleAddNote = () => {
    const newNoteDate: NoteDateType = {
      id: `${Math.floor(Date.now())}${Math.floor(Math.random() * 1000000)}`,
      title: title,
      content: content,
      date: formatCurrentDate(),
      backgroundColor: backgroundColor,
      priority: priority,
      tags,
      pined,
      archive,
      deleteData,
    };
    dispatch(addNoteList([newNoteDate]));
  };

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [backgroundColor, setBackgroungColor] = useState<string>("white");
  const [priority, setPriority] = useState<string>("high");

  function formatCurrentDate() {
    const now = new Date();

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

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
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
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </S.Editor>
        <S.Options>
          <S.BasicButton>Add Tag</S.BasicButton>
          <S.SelectBox>
            <p>배경색</p>
            <select
              onChange={(e) => {
                setBackgroungColor(e.target.value);
              }}
            >
              <option value="white">White</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
            </select>
          </S.SelectBox>
          <S.SelectBox>
            <p>우선순위</p>
            <select
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </S.SelectBox>
        </S.Options>
        <S.SubmitButton onClick={handleAddNote}>+생성하기</S.SubmitButton>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
};
export default AddNoteModal;

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
