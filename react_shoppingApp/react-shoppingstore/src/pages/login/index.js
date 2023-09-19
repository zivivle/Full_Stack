import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../../apis/firebase_config";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, emailValue, passwordValue);
			alert("로그인이 완료되었습니다.");
			setTimeout(() => {
				navigate("/product");
			}, 1000);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<S.LoginContainer>
				<S.LoginBox>
					<h2>Login</h2>
					<LoginInput
						type="text"
						placeholder="Email"
						onChange={e => {
							setEmailValue(e.target.value);
						}}
					/>
					<LoginInput
						type="password"
						placeholder="Password"
						onChange={e => {
							setPasswordValue(e.target.value);
						}}
					/>
					<LoginButton onClick={login}>Login</LoginButton>
					<S.AccountQuestion>
						<p>계정이 없습니까?</p>
						<S.SignupLink>가입하기</S.SignupLink>
					</S.AccountQuestion>
				</S.LoginBox>
			</S.LoginContainer>
		</>
	);
};

export default LoginPage;

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24.18vh 0vh;
	background-color: #f3f4f6;
`;

const LoginBox = styled.div`
	width: 300px;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const LoginInput = styled.input`
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #d1d5db;
	border-radius: 4px;
`;

const LoginButton = styled.button`
	width: 100%;
	padding: 10px;
	background-color: #3f51b5;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
	:hover {
		background-color: #303f9f;
	}
`;

const AccountQuestion = styled.div`
	font-size: 12px;
	padding-top: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		margin-right: 5px;
	}
`;

const SignupLink = styled.p`
	color: #3f51b5;
	cursor: pointer;
	transition: color 0.3s;
	:hover {
		text-decoration: underline;
		color: #303f9f;
	}
`;

const S = {
	LoginContainer,
	LoginBox,
	LoginInput,
	LoginButton,
	AccountQuestion,
	SignupLink,
};
