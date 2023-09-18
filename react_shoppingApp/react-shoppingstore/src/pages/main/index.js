import styled from "styled-components";
import MainTabs from "./components/tabs/Tabs";
import OneProduct from "./components/one-product/OneProduct";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/store";

const Main = () => {
	const productInfo = {
		name: "상품 이름",
		price: 21.9,
		image: "/img/hello.png",
	};

	const dispatch = useDispatch();
	const handleAddCart = () => {
		dispatch(addCart(productInfo));
	};
	return (
		<>
			<S.MainContainer>
				<S.MainTitle>Products</S.MainTitle>
				<MainTabs />
				<S.InfoText>showing: 20 items</S.InfoText>
				<S.ProductContainer>
					<OneProduct handleAddCart={handleAddCart} />
				</S.ProductContainer>
			</S.MainContainer>
		</>
	);
};

export default Main;

const MainContainer = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 20.5px;
	background-color: #f7f7f7;
`;
const MainTitle = styled.h2`
	font-size: 24px;
	color: #333;
	margin-bottom: 20px;
`;
const InfoText = styled.p`
	font-size: 14px;
	color: #888;
	margin-bottom: 10px;
`;
const ProductContainer = styled.div`
	background-color: #fff;
	border-radius: 5px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	display: flex; /* 플렉스박스 레이아웃을 사용 */
	flex-wrap: wrap; /* 아이템들이 컨테이너 너비를 초과할 경우 다음 행으로 감싸짐 */
	justify-content: space-between; /* 아이템들 사이의 간격을 균등하게 설정 */
	gap: 20px;
`;

const S = {
	MainContainer,
	MainTitle,
	InfoText,
	ProductContainer,
};
