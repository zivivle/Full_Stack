import "draft-js/dist/Draft.css"; // 기본 스타일
import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { NoteDateType } from "../../types/noteDateTypes";
import { useState } from "react";
import { useDispatch } from "react-redux";

import AddTagModal from "../AddTagModal";
import { addNoteList } from "../../reducers/noteReducer";
interface AddNoteModalProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pined: boolean;
  archive: boolean;
  deleteData: boolean;
}

interface TextareaProps {
  $italic?: boolean;
  $underline?: boolean;
  $lineThrough?: boolean;
  $bgColor?: string;
}
const AddNoteModal = ({
  setIsAddModalOpen,
  pined,
  archive,
  deleteData,
}: AddNoteModalProps) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState<string[]>([]);

  const handleAddNote = () => {
    const newNoteDate: NoteDateType = {
      id: `${Math.floor(Date.now())}${Math.floor(Math.random() * 1000000)}`,
      title: title,
      content: content,
      date: new Date().toString(),
      editDate: "",
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
  const [backgroundColor, setBackgroungColor] = useState<string>("Pink");
  const [priority, setPriority] = useState<string>("high");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [listType, setListType] = useState<"bulleted" | "numbered" | null>(
    null
  );
  const [italicStyle, setItalicStyle] = useState(false);
  const [lineThroughStyle, setLineThroughStyle] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState(false);

  const handleItalicClick = () => {
    setItalicStyle((prev) => !prev);
  };

  const handleUnderlineClick = () => {
    setUnderlineStyle((prev) => !prev);
  };

  const handleLineThroughClick = () => {
    setLineThroughStyle((prev) => !prev);
  };

  const handleBulletedClick = () => {
    const transformedContent = content
      .split("\n")
      .map((line) => {
        return `- ${line.replace(/^\d+\.\s|- /, "").trim()}`;
      })
      .join("\n");
    setContent(transformedContent);
    setListType("bulleted");
  };

  const handleNumberedClick = () => {
    const transformedContent = content
      .split("\n")
      .map((line, index) => {
        return `${index + 1}. ${line.replace(/^\d+\.\s|- /, "").trim()}`;
      })
      .join("\n");
    setContent(transformedContent);
    setListType("numbered");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 사용자가 내용을 지웠는지 확인
    const isDeleteAction = value.length < content.length;

    if (listType === "numbered" && value.endsWith("\n") && !isDeleteAction) {
      const lines = value.split("\n");
      const lastLine = lines[lines.length - 2];
      const lastNumber = Number(lastLine?.match(/^(\d+)\./)?.[1] || 0);
      if (!lastLine.trim()) {
        setContent(value.trim() + "\n");
      } else {
        setContent((prev) => prev + `\n${lastNumber + 1}. `);
      }
    } else if (
      listType === "bulleted" &&
      value.endsWith("\n") &&
      !isDeleteAction
    ) {
      const lines = value.split("\n");
      const lastLine = lines[lines.length - 2];
      if (!lastLine.trim()) {
        setContent(value.trim() + "\n");
      } else {
        setContent((prev) => prev + "\n- ");
      }
    } else {
      setContent(value);
    }
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const hadleTagModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen ? (
        <AddTagModal setIsModalOpen={setIsModalOpen} setTags={setTags} />
      ) : null}
      <S.ModalWrapper>
        <S.ModalContainer>
          <S.TitleContainer>
            <h5>노트 생성하기</h5>
            <img
              src="/img/hello.png"
              alt="닫기"
              onClick={handleAddModalClose}
            />
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
                <img
                  src="/img/hello.png"
                  alt="번호 달기"
                  onClick={handleNumberedClick}
                />
                <img
                  src="/img/hello.png"
                  alt="점 달기"
                  onClick={handleBulletedClick}
                />
              </S.ToolbarGroup>
              <S.ToolbarGroup>
                <img
                  src="/img/hello.png"
                  alt="이태릭체"
                  onClick={handleItalicClick}
                />
                <img
                  src="/img/hello.png"
                  alt="폰트 바텀 라인"
                  onClick={handleUnderlineClick}
                />
                <img
                  src="/img/hello.png"
                  alt="폰트 센터 라인"
                  onClick={handleLineThroughClick}
                />
              </S.ToolbarGroup>
              <S.ToolbarGroup>
                <img src="/img/hello.png" alt="이미지 업로드" />
                <img src="/img/hello.png" alt="인용문" />
                <img src="/img/hello.png" alt="코드" />
              </S.ToolbarGroup>
            </S.ToolbarContainer>
            <Textarea
              value={content}
              placeholder="내용을 입력하세요..."
              $italic={italicStyle}
              $underline={underlineStyle}
              $lineThrough={lineThroughStyle}
              $bgColor={backgroundColor}
              onChange={handleTextareaChange}
            ></Textarea>
          </S.Editor>
          <S.Options>
            <S.BasicButton onClick={hadleTagModalOpen}>Add Tag</S.BasicButton>
            {tags?.map((tag) => (
              <div>{tag}</div>
            ))}
            <S.SelectBox>
              <p>배경색</p>
              <select
                onChange={(e) => {
                  setBackgroungColor(e.target.value);
                }}
              >
                <option value="pink">Pink</option>
                <option value="#A2DFF7">Blue</option>
                <option value="white">White</option>
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
    </>
  );
};
export default AddNoteModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 50vw;
  padding: 20px;
  border: 1px solid #e0e0e0;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const TitleContainer = styled.div`
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
`;

const Editor = styled.div`
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
`;

const SelectBox = styled.div`
  ${flexRow}
  p {
    margin: 5px 5px 0px 0px;
  }
`;

const Options = styled.div`
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
`;

const Textarea = styled.textarea<TextareaProps>`
  font-style: ${(props) => props.$italic && "italic"};
  text-decoration: ${(props) =>
    (props.$underline && "underline") ||
    (props.$lineThrough && "line-through") ||
    "none"};
  background-color: ${(props) => props.$bgColor};
`;

const BasicButton = styled.button`
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
`;

const SubmitButton = styled.button`
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
`;

const ToolbarContainer = styled.div`
  border: 1px solid #e0e0e0;
  padding: 5px 10px;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  border-bottom: none;
`;

const ToolbarGroup = styled.div`
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
`;

const S = {
  ModalWrapper,
  ModalContainer,
  TitleContainer,
  Editor,
  SelectBox,
  Options,
  Textarea,
  BasicButton,
  SubmitButton,
  ToolbarContainer,
  ToolbarGroup,
};
