import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../../apis/firebase_config";
import { signOut } from "firebase/auth";
import { RootState } from "types/reduxTypes";

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.reduce((total, item) => (total += item.count), 0)
  );

  const logout = async () => {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderTitle
          onClick={() => {
            navigate("/product");
          }}
        >
          Hello Store
        </S.HeaderTitle>
        <S.HeaderImgs>
          <img
            src="/img/cart.png"
            alt="cart"
            onClick={() => {
              navigate("/cart");
            }}
          />
          <S.CartCounter>{cartItemCount}</S.CartCounter>
          <img src="/img/out.png" alt="logout" onClick={logout} />
          <img
            src="/img/user.png"
            alt="user"
            onClick={() => {
              navigate("/");
            }}
          />
        </S.HeaderImgs>
      </S.HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #f7f7f7;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const HeaderImgs = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%; /* 원형 모양을 위한 스타일 */
    transition: transform 0.3s ease; /* 호버 효과를 위한 부드러운 전환 */
  }
  img:hover {
    transform: scale(1.1); /* 이미지 호버 시 약간 확대 */
  }
`;

const CartCounter = styled.div`
  color: white;
`;

const S = {
  HeaderContainer,
  HeaderTitle,
  HeaderImgs,
  CartCounter,
};
