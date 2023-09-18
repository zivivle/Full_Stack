import styled from "styled-components";
import { flexCenter, flexColumn, flexRow } from "../../../../styles/common";

const OneProduct = ({ handleAddCart }) => {
	return (
		<>
			<S.ProductBox>
				<img src="/img/hello.png" />
				<S.ProductTitle>상품 이름</S.ProductTitle>
				<S.SubButtonText>
					<S.ProductCartButton onClick={handleAddCart}>
						장바구니 담기
					</S.ProductCartButton>
					<p>21.90$</p>
				</S.SubButtonText>
			</S.ProductBox>
		</>
	);
};

export default OneProduct;

const ProductBox = styled.div`
	background-color: #e9ecef;
	${flexCenter}
	${flexColumn}}
	width: 260px;
	padding: 20px 20px 5px 20px;
	border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
	cursor: pointer;
	img {
		width: 200px;
	}
`;

const ProductTitle = styled.h2`
	margin: 20px 0px;
`;

const SubButtonText = styled.div`
	width: 100%;
	${flexRow}
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	p {
		margin-top: 10px;
	}
	button:hover {
		background-color: #303f9f;
		color: #fff;
	}
`;

const ProductCartButton = styled.button`
	width: 50%;
	padding: 10px;
	background-color: #fff;
	color: ${({ theme }) => theme.PALETTE["darkBlack"]};
	border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
`;

const S = {
	ProductBox,
	ProductTitle,
	SubButtonText,
	ProductCartButton,
};
