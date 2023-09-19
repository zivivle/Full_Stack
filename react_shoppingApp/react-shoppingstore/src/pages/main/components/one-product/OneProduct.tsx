import styled from "styled-components";
import { flexCenter, flexColumn, flexRow } from "../../../../styles/common";
import { useNavigate } from "react-router-dom";
import { ProductItem } from "types/productTypes";

interface OneProductProps {
  product: ProductItem;
  handleAddCart: (product: ProductItem) => void;
}

const OneProduct = ({
  product,
  handleAddCart,
}: OneProductProps): JSX.Element => {
  const navigate = useNavigate();

  const hadlePassProductData = () => {
    navigate("/productDetail", { state: { selectedProduct: product } });
  };

  return (
    <>
      <S.ProductBox>
        <img src={product?.image} onClick={hadlePassProductData} />
        <S.ProductTitle onClick={hadlePassProductData}>
          {product?.title}
        </S.ProductTitle>
        <S.SubButtonText>
          <S.ProductCartButton
            onClick={() => {
              handleAddCart(product);
            }}
          >
            장바구니 담기
          </S.ProductCartButton>
          <p>{product?.price}$</p>
        </S.SubButtonText>
      </S.ProductBox>
    </>
  );
};

export default OneProduct;

const ProductBox = styled.div`
  background-color: #e9ecef;
  ${flexCenter}
  ${flexColumn}
	width: 260px;
  padding: 20px 20px 5px 20px;
  border: 1px solid ${({ theme }) => theme.PALETTE["darkBlack"]};
  cursor: pointer;
  img {
    width: 100px;
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
