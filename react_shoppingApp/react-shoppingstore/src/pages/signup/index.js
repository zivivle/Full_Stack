import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../../apis/firebase_config";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
	const navigate = useNavigate();
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const register = async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword,
			);
			alert("회원가입이 완료되었습니다.");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (error) {
			console.log(error.message);
			alert("회원가입이 실패하였습니다. 다시 시도해주세요");
		}
	};
	return (
		<>
			<S.SignupContainer>
				<S.SignupBox>
					<h2>Signup</h2>
					<S.SignupInput
						type="text"
						placeholder="Email"
						onChange={e => {
							setRegisterEmail(e.target.value);
						}}
					/>
					<S.SignupInput
						type="password"
						placeholder="Password"
						onChange={e => {
							setRegisterPassword(e.target.value);
						}}
					/>
					<S.SignupButton onClick={register}>Signup</S.SignupButton>
					<S.AccountQuestion>
						<p>계정이 있습니까?</p>
						<S.SignupLink>로그인하러 가기</S.SignupLink>
					</S.AccountQuestion>
				</S.SignupBox>
			</S.SignupContainer>
		</>
	);
};

export default SignupPage;

const SignupContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24.18vh 0vh;
	background-color: #f3f4f6;
`;

const SignupBox = styled.div`
	width: 300px;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const SignupInput = styled.input`
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #d1d5db;
	border-radius: 4px;
`;

const SignupButton = styled.button`
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
	SignupContainer,
	SignupBox,
	SignupInput,
	SignupButton,
	AccountQuestion,
	SignupLink,
};
