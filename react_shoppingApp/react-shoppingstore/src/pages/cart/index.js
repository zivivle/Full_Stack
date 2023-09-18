import styled from "styled-components";
import OneProductList from "./components/one-list/OneProductList";
import { useSelector } from "react-redux";

const CartPage = () => {
	const cartItem = useSelector(state => state.cart);
	const cartItemTotalPrice = cartItem.reduce(
		(total, item) => (total += item.price),
		0,
	);
	const cartItemTotalCount = cartItem.reduce(
		(total, item) => (total += item.count),
		0,
	);

	return (
		<S.CartContainer>
			<S.Title>장바구니</S.Title>
			{cartItem.map((item, index) => (
				<OneProductList key={index} item={item} />
			))}
			<S.TotalPrice>
				총 금액: {(cartItemTotalPrice * cartItemTotalCount).toFixed(2)}$
			</S.TotalPrice>
		</S.CartContainer>
	);
};

export default CartPage;

const CartContainer = styled.div`
	width: 80%;
	max-width: 800px;
	margin: 2rem auto;
	padding: 20px;
	background-color: #f7f7f7;
	border-radius: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
	font-size: 2rem;
	color: #333;
	margin-bottom: 20px;
	text-align: center;
`;

const CartItem = styled.div`
	background-color: #fff;
	padding: 10px;
	border-radius: 5px;
	margin-bottom: 15px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TotalPrice = styled.p`
	font-size: 1.2rem;
	color: #444;
	text-align: right;
	margin-top: 20px;
	font-weight: bold;
`;

const S = {
	CartContainer,
	Title,
	CartItem,
	TotalPrice,
};
