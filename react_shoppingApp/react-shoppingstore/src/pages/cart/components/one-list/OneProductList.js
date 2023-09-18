import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
	decrementItemCount,
	deleteCart,
	incrementItemCount,
} from "../../../../store/store";

const OneProductList = ({ item }) => {
	const dispatch = useDispatch();
	const handlePlusProductCount = item => {
		dispatch(incrementItemCount(item));
	};
	const handleMinusProductCount = item => {
		dispatch(decrementItemCount(item));
	};
	const handleDeleteProduct = item => {
		dispatch(deleteCart(item));
	};

	return (
		<S.ProductBox>
			<S.ProductImage src={item.image} />
			<S.ProductInfo>
				<S.CategoryBox>
					<S.CategoryText>카테고리</S.CategoryText>
					<S.TrashIcon
						src="/img/delete.png"
						alt="휴지통아이콘"
						onClick={() => {
							handleDeleteProduct(item);
						}}
					/>
				</S.CategoryBox>
				<S.ProductDetail>
					<p>브랜드 - {item.name}</p>
					<S.QuantityBox>
						<S.QuantityButton
							onClick={() => {
								handleMinusProductCount(item);
							}}
						>
							-
						</S.QuantityButton>
						<S.Quantity>{item.count}</S.Quantity>
						<S.QuantityButton
							onClick={() => {
								handlePlusProductCount(item);
							}}
						>
							+
						</S.QuantityButton>
					</S.QuantityBox>
				</S.ProductDetail>
				<S.PriceInfo>
					{item.price} x {item.count} = $ {(item.price * item.count).toFixed(2)}
				</S.PriceInfo>
			</S.ProductInfo>
		</S.ProductBox>
	);
};

export default OneProductList;

const ProductBox = styled.div`
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 10px 15px;
	border-radius: 5px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	margin-bottom: 25px;
`;

const ProductImage = styled.img`
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 5px;
	margin-right: 10px;
`;

const ProductInfo = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const CategoryBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	img {
		width: 20px;
		height: 20px;
		transition: transform 0.3s ease; /* 호버 효과를 위한 부드러운 전환 */
	}
	img:hover {
		transform: scale(1.1); /* 이미지 호버 시 약간 확대 */
	}
`;

const CategoryText = styled.p`
	font-size: 0.8rem;
	color: #555;
`;

const TrashIcon = styled.img`
	width: 20px;
	height: 20px;
	margin-bottom: 5px;
	cursor: pointer;
`;

const ProductDetail = styled.div`
	margin-top: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const QuantityBox = styled.div`
	display: flex;
	align-items: center;
	button:hover {
		background-color: #c9c9c9;
	}
`;

const QuantityButton = styled.button`
	width: 20px;
	height: 20px;
	background-color: #e9ecef;
	border: none;
	border-radius: 3px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s;
`;

const Quantity = styled.div`
	padding: 0 10px;
`;

const PriceInfo = styled.p`
	margin-top: 10px;
	font-size: 0.9rem;
`;

const S = {
	ProductBox,
	ProductImage,
	ProductInfo,
	CategoryBox,
	CategoryText,
	TrashIcon,
	ProductDetail,
	QuantityBox,
	QuantityButton,
	Quantity,
	PriceInfo,
};
