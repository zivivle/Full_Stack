import styled from "styled-components";
import MainTabs from "./components/tabs/Tabs";
import OneProduct from "./components/one-product/OneProduct";
import { useDispatch } from "react-redux";
import { addCart } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProductItem } from "types/productTypes";

const Main = (): JSX.Element => {
  const getProductData = async () => {
    return await (await fetch("https://fakestoreapi.com/products")).json();
  };

  const [filteredProduct, setFilteredProduct] = useState([]);

  const { data, isLoading } = useQuery(["product"], getProductData);

  useEffect(() => {
    if (data) {
      setFilteredProduct(data);
    }
  }, [data]);

  const dispatch = useDispatch();

  const handleAddCart = (product: ProductItem) => {
    dispatch(addCart(product));
  };

  const handleProductsFilter = (field: string) => {
    if (field === "All") {
      return setFilteredProduct(data);
    } else {
      const filteredItem = data
        ? data.filter((product: ProductItem) => product.category === field)
        : [];
      setFilteredProduct(filteredItem);
    }
  };

  return (
    <>
      <S.MainContainer>
        <S.MainTitle>Products</S.MainTitle>
        <MainTabs handleProductsFilter={handleProductsFilter} />
        <S.InfoText>showing: 20 items</S.InfoText>
        {isLoading ? (
          <>
            <img src="/img/loading.gif" alt="로딩아이콘" />
          </>
        ) : (
          <S.ProductContainer>
            {filteredProduct &&
              filteredProduct.map((product: ProductItem) => (
                <OneProduct
                  key={product.id}
                  product={product}
                  handleAddCart={handleAddCart}
                />
              ))}
          </S.ProductContainer>
        )}
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const S = {
  MainContainer,
  MainTitle,
  InfoText,
  ProductContainer,
};
