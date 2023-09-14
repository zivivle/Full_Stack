import styled from "styled-components";
import { flexCenter } from "styles/common";

const Button = ({ children, handleExpenses }) => {
	return (
		<S.ButtonContainer>
			<S.ButtonType onClick={handleExpenses}>{children}</S.ButtonType>
		</S.ButtonContainer>
	);
};
export default Button;

const ButtonContainer = styled.div`
	${flexCenter}
`;

const ButtonType = styled.button`
	background-color: ${({ theme }) => theme.PALETTE.primary};
	border: none;
	color: ${({ theme }) => theme.PALETTE.white};
	width: 450px;
	padding: 8px;
	height: 30px;
	cursor: pointer;
`;

const S = {
	ButtonType,
	ButtonContainer,
};
