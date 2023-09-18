import styled from "styled-components";

const Footer = () => {
	return (
		<>
			<S.FooterContainer>
				{/* img 너무큼 수정바람 */}
				<S.FooterImg src="/img/hello.png" />
				<S.FooterLink>
					<p>© 2023 Hello store. All rights reserved.</p> <p>Privacy Policy</p>{" "}
					<p>Korea Privacy Notice</p> <p>Terms of Use</p> <p>Accessibility</p>{" "}
					<p>Supply Chain Transparency</p>
					<p>Your Privacy Choices</p>
				</S.FooterLink>
			</S.FooterContainer>
		</>
	);
};

export default Footer;

const FooterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #333;
	padding: 20px 40px;
	color: #f7f7f7;
	font-size: 14px;
`;

const FooterImg = styled.img`
	width: 70px;
	margin-right: 20px;
`;

const FooterLink = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
	p {
		cursor: pointer;
		transition: color 0.3s ease;
	}
	p:hover {
		color: #fff;
	}
`;

const S = {
	FooterContainer,
	FooterImg,
	FooterLink,
};
