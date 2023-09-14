import { useState } from "react";
import styled from "styled-components";
import { flexCenter, flexRow } from "styles/common";
import Input from "../Input";

const Lists = ({
	expense,
	handleDeleteExpense,
	setEventColor,
	setEventText,
	setIsVisible,
	handleTotalCost,
	setExpenses,
	expenses,
}) => {
	const [count, setCount] = useState(0);
	const [isEdit, setIsEdit] = useState(false);
	const [newExpenseDetail, setNewExpenseDetail] = useState("");
	const [newExpenseCost, setNewExpenseCost] = useState("");

	const handleEditExpense = () => {
		setCount(prevCount => {
			const newCount = prevCount + 1;
			if (newCount % 2) {
				setIsEdit(true);
				setNewExpenseDetail(expense.detail);
				setNewExpenseCost(expense.cost);
			} else {
				if (!newExpenseDetail || !newExpenseCost) return newCount;
				setIsEdit(false);
				handleCompleteExpense();
			}
			return newCount;
		});
	};

	const handleCompleteExpense = () => {
		expense.detail = newExpenseDetail;
		expense.cost = Number(newExpenseCost);
		const updatedExpenses = expenses.map(exp => {
			if (exp.id === expense.id) {
				return expense;
			}
			return exp;
		});

		// expenses 상태 업데이트
		setExpenses(updatedExpenses);

		// 총 지출 업데이트
		handleTotalCost(updatedExpenses);

		// 이벤트 설정
		setEventColor("yellow");
		setEventText("아이템이 수정되었습니다.");
		setIsVisible(true);
	};

	return (
		<>
			<S.ListContainer>
				<S.FlexRowText>
					{isEdit ? (
						<Input
							expenseField={newExpenseDetail}
							setExpenseField={setNewExpenseDetail}
						/>
					) : (
						<S.Text1>{expense.detail}</S.Text1>
					)}
					{isEdit ? (
						<Input
							expenseField={newExpenseCost}
							setExpenseField={setNewExpenseCost}
							isCost={true}
						/>
					) : (
						<S.Text2>{expense.cost}</S.Text2>
					)}
				</S.FlexRowText>
				<S.FlexRowImage>
					<img
						src="/img/edit.png"
						alt="Description"
						onClick={handleEditExpense}
					/>
					<img
						src="/img/x-mark.png"
						alt="Description"
						onClick={() => {
							handleDeleteExpense(expense.id);
						}}
					/>
				</S.FlexRowImage>
			</S.ListContainer>
		</>
	);
};
export default Lists;

const ListContainer = styled.div`
	${flexCenter}
	${flexRow}
    margin: 20px
`;

const Text1 = styled.p`
	margin-right: 40px;
`;

const Text2 = styled.p`
	margin: 0px 90px;
`;

const FlexRowText = styled.div`
	${flexRow}
	${flexCenter}
	margin: 10px 20px
    background-color: blue;
`;

const FlexRowImage = styled.div`
	${flexRow}
	${flexCenter}
	margin: 10px 20px
`;

const S = {
	ListContainer,
	FlexRowText,
	FlexRowImage,
	Text1,
	Text2,
};
