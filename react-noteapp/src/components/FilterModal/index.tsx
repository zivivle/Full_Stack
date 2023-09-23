import styled from "styled-components";
import { flexRow } from "../../styles/common";
import { useEffect, useState } from "react";
import { NoteDateType } from "../../types/noteDateTypes";
import { useDispatch } from "react-redux";
import { filteredNoteList } from "../../reducers/noteReducer";

interface FilterModalProps {
  setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteData: NoteDateType[];
}

interface CheckboxStates {
  lowToHigh: boolean;
  highToLow: boolean;
  sortByLatest: boolean;
  sortByCreated: boolean;
  sortByEdited: boolean;
}

interface CustomCheckboxProps {
  isChecked: boolean;
}

const FilterModal = ({ setIsFilterModalOpen, noteData }: FilterModalProps) => {
  const initialCheckboxStates: CheckboxStates = {
    lowToHigh: false,
    highToLow: false,
    sortByLatest: false,
    sortByCreated: false,
    sortByEdited: false,
  };

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);
  const dispatch = useDispatch();

  const handleFilterModalClose = () => {
    if (setIsFilterModalOpen) {
      setIsFilterModalOpen(false);
    }
  };

  const hadlefilterClear = () => {
    dispatch(filteredNoteList("clear"));
    setCheckboxStates(initialCheckboxStates);
  };

  const handleFilterData = (field: keyof CheckboxStates) => {
    const updatedCheckboxStates = { ...initialCheckboxStates };
    updatedCheckboxStates[field] = true;
    setCheckboxStates(updatedCheckboxStates);
  };

  useEffect(() => {
    if (checkboxStates.sortByLatest) {
      dispatch(filteredNoteList("sortByLatest"));
    }

    if (checkboxStates.sortByCreated) {
      dispatch(filteredNoteList("sortByCreated"));
    }

    if (checkboxStates.sortByEdited) {
      dispatch(filteredNoteList("sortByEdited"));
    }

    if (checkboxStates.highToLow) {
      dispatch(filteredNoteList("highToLow"));
    }

    if (checkboxStates.lowToHigh) {
      dispatch(filteredNoteList("lowToHigh"));
    }
  }, [checkboxStates, dispatch]);

  return (
    <S.ModalWrapper>
      <S.ModalContainer>
        <S.ModalHeader>
          <h3>정렬</h3>
          <S.IconBox>
            <p onClick={hadlefilterClear}>clear</p>
            <S.Icon
              src="#"
              alt="창 종료 아이콘"
              onClick={handleFilterModalClose}
            />
          </S.IconBox>
        </S.ModalHeader>
        <S.SortSection>
          <h5>PRIORITY</h5>
          <S.CheckboxWrapper>
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox
                isChecked={checkboxStates.lowToHigh}
                onClick={() => {
                  handleFilterData("lowToHigh");
                }}
              />
              <p>Low to High</p>
            </S.CustomCheckboxWrapper>
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox
                isChecked={checkboxStates.highToLow}
                onClick={() => {
                  handleFilterData("highToLow");
                }}
              />
              <p>High to Low</p>
            </S.CustomCheckboxWrapper>
          </S.CheckboxWrapper>
        </S.SortSection>
        <S.SortSection>
          <h5>DATE</h5>
          <S.CheckboxWrapper>
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox
                isChecked={checkboxStates.sortByLatest}
                onClick={() => {
                  handleFilterData("sortByLatest");
                }}
              />
              <p>Sort by Latest</p>
            </S.CustomCheckboxWrapper>
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox
                isChecked={checkboxStates.sortByCreated}
                onClick={() => {
                  handleFilterData("sortByCreated");
                }}
              />
              <p>Sort by Created</p>
            </S.CustomCheckboxWrapper>
            <S.CustomCheckboxWrapper>
              <S.CustomCheckbox
                isChecked={checkboxStates.sortByEdited}
                onClick={() => {
                  handleFilterData("sortByEdited");
                }}
              />
              <p>Sort by Edited</p>
            </S.CustomCheckboxWrapper>
          </S.CheckboxWrapper>
        </S.SortSection>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
};
export default FilterModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
`;

const ModalContainer = styled.div`
  width: 30vw;
  padding: 20px;
  border: 1px solid #e0e0e0;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBox = styled.div`
  ${flexRow}
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    opacity: 0.7;
  }
`;
const SortSection = styled.div`
  margin-top: 20px;
`;
const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;
const CustomCheckboxWrapper = styled.div`
  ${flexRow}
`;

const CustomCheckbox = styled.div<CustomCheckboxProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background-color: ${(props) => (props.isChecked ? "#a0a0a0" : "white")};
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    border-color: #a0a0a0;
  }
`;

const S = {
  ModalWrapper,
  ModalContainer,
  ModalHeader,
  IconBox,
  Icon,
  SortSection,
  CheckboxWrapper,
  CustomCheckboxWrapper,
  CustomCheckbox,
};
