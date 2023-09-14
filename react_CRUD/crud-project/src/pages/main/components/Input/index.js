import styled from "styled-components";

const Input = ({
	expenseField,
	setExpenseField,
	isCost = false,
	placeholder,
}) => {
	const handleExpenseInput = e => {
		e.preventDefault();
		const inputValue = e.target.value;

		if (isCost && !/^\d*$/.test(inputValue)) {
			console.warn("숫자만 입력하쇼");
			return;
		}

		setExpenseField(inputValue);
		console.log("expenseValue", expenseField);
	};

	return (
		<>
			<S.InputType
				value={expenseField}
				onChange={e => {
					handleExpenseInput(e);
				}}
				placeholder={placeholder}
			/>
		</>
	);
};

export default Input;

const InputType = styled.input`
	border: none;
	border-bottom: 1px solid #c1c1c1;
	margin-left: 20px;
	padding: 8px 1px;
	width: 150px;
	font-size: 16px;
	color: ${({ theme }) => theme.PALETTE.black};
	:focus {
		outline: none;
	}
	::placeholder {
		color: #c1c1c1;
	}
`;

const S = {
	InputType,
};
