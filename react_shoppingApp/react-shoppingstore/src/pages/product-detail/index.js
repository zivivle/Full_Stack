import styled from "styled-components";
import { flexCenter } from "../../styles/common";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/store";

const ProductDetail = () => {
	const dispatch = useDispatch();
	const handleAddCart = product => {
		dispatch(addCart(product));
	};
	const { state } = useLocation();
	const navigate = useNavigate();
	return (
		<S.DetailContainer>
			<S.ProductImage src={state?.selectedProduct.image} alt="Product Image" />
			<S.ProductInfo>
				<S.ProductCategory>{state?.selectedProduct.category}</S.ProductCategory>
				<S.ProductName>{state?.selectedProduct.title}</S.ProductName>
				<S.ProductPrice>{state?.selectedProduct.price}$</S.ProductPrice>
				<S.ProductDetailText>
					{state?.selectedProduct.description}
				</S.ProductDetailText>
				<div>
					<S.AddToCartButton
						onClick={() => {
							handleAddCart(state?.selectedProduct);
						}}
					>
						장바구니에 담기
					</S.AddToCartButton>
					<S.GoToCartButton
						onClick={() => {
							navigate("/cart");
						}}
					>
						장바구니로 이동
					</S.GoToCartButton>
				</div>
			</S.ProductInfo>
		</S.DetailContainer>
	);
};

export default ProductDetail;

const DetailContainer = styled.div`
	${flexCenter}
	display: flex;
	align-items: center;
	padding: 57px 50px;
	background-color: #f7f7f7;
	border-radius: 8px;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
	max-width: 440px;
	margin: 40px;
	height: auto;
	margin-right: 0px 40px;
	border-radius: 4px;
`;

const ProductInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-left: 60px;
`;

const ProductCategory = styled.p`
	font-size: 16px;
	font-weight: 600;
	color: #a9a9a9;
`;

const ProductName = styled.h2`
	font-size: 24px;
	color: #333;
	margin: 10px 0;
`;

const ProductPrice = styled.span`
	font-size: 20px;
	color: #555;
	margin-bottom: 40px;
`;
const ProductDetailText = styled.p`
	width: 100%;
	font-size: 20px;
	color: #555;
	margin-bottom: 100px;
`;

const AddToCartButton = styled.button`
	padding: 20px 50px;
	font-size: 18px;
	color: ${({ theme }) => theme.PALETTE["darkBlack"]};
	border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
	background-color: #fff;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #d6d6d6;
	}

	&:not(:last-child) {
		margin-right: 10px;
	}
`;

const GoToCartButton = styled(AddToCartButton)`
	background-color: #a3a3a3;
	margin-left: 30px;
	border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
	cursor: pointer;
	transition: background-color 0.3s;
	border-radius: 4px;
	&:hover {
		background-color: #d6d6d6;
	}
`;

const S = {
	DetailContainer,
	ProductImage,
	ProductInfo,
	ProductDetailText,
	ProductCategory,
	ProductName,
	ProductPrice,
	AddToCartButton,
	GoToCartButton,
};
