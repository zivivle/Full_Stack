import styled from "styled-components";
import Button from "./components/Button";
import Lists from "./components/Lists";
import Input from "./components/Input";
import { flexCenter, flexRow } from "styles/common";
import { useState } from "react";
import EventNotification from "./components/EventNotification";

const Main = () => {
	const [expenseDetail, setExpenseDetail] = useState("");
	const [expenseCost, setExpenseCost] = useState(0);
	const [expenses, setExpenses] = useState([]);
	const [costTotal, setCostTotal] = useState(0);
	const [eventColor, setEventColor] = useState("");
	const [eventText, setEventText] = useState("");
	const [isVisible, setIsVisible] = useState(true);

	const handleAddExpenses = () => {
		if (!expenseDetail || !expenseCost) return;
		const newExpense = {
			detail: expenseDetail,
			cost: Number(expenseCost),
			id: Date.now(),
		};
		const updatedExpenses = [...expenses, newExpense];
		setExpenses(updatedExpenses);
		setExpenseDetail("");
		setExpenseCost("");
		handleTotalCost(updatedExpenses);
		setEventColor("primary");
		setEventText("아이템이 생성되었습니다.");
		setIsVisible(true);
	};

	const handleDeleteExpense = exId => {
		const updatedExpenses = expenses.filter(expense => expense.id !== exId);
		setExpenses(updatedExpenses);
		handleTotalCost(updatedExpenses);
		setEventColor("red");
		setEventText("아이템이 삭제되었습니다.");
		setIsVisible(true);
	};

	const handleTotalCost = updatedExpenses => {
		let total = 0;
		updatedExpenses.forEach(expense => (total += expense.cost));
		setCostTotal(total);
	};

	const handleClearExpense = () => {
		const clear = [];
		setExpenses(clear);
		handleTotalCost(clear);
	};

	return (
		<>
			<S.Container>
				{isVisible ? (
					<EventNotification
						color={eventColor}
						children={eventText}
						setIsVisible={setIsVisible}
					/>
				) : null}
				<S.Title>예산 계산기</S.Title>
				<div>
					<S.FlexRow>
						<S.FlexRow>
							<p>지출 항목</p>
							<Input
								expenseField={expenseDetail}
								setExpenseField={setExpenseDetail}
								placeholder={`ex) 식비`}
							/>
						</S.FlexRow>
						<S.FlexRow>
							<S.SubText>비용</S.SubText>
							<Input
								expenseField={expenseCost}
								setExpenseField={setExpenseCost}
								isCost={true}
							/>
						</S.FlexRow>
					</S.FlexRow>
					<Button children={"제출하기"} handleExpenses={handleAddExpenses} />
					{expenses.map(expense => (
						<Lists
							key={expense.id}
							expense={expense}
							handleDeleteExpense={handleDeleteExpense}
							setEventColor={setEventColor}
							setEventText={setEventText}
							setIsVisible={setIsVisible}
							handleTotalCost={handleTotalCost}
							setExpenses={setExpenses}
							expenses={expenses}
						/>
					))}
					<Button
						children={"목록 지우기"}
						handleExpenses={handleClearExpense}
					/>
				</div>
				<div>
					<S.Title>총지출: {costTotal}원</S.Title>
				</div>
			</S.Container>
		</>
	);
};
export default Main;

const Container = styled.div`
	margin: 20px;
	width: 780px;
	background-color: ${({ theme }) => theme.PALETTE["turquoise"]};
	height: auto;
	color: white;
`;

const Title = styled.h1`
	${flexCenter}
	margin: 20px 0px
`;

const SubText = styled.p`
	margin-left: 20px;
`;

const FlexRow = styled.div`
	${flexRow}
	${flexCenter}
	margin: 10px 0px
`;

const S = {
	Container,
	FlexRow,
	Title,
	SubText,
};
