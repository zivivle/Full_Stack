import { useEffect } from "react";
import styled from "styled-components";
import { flexCenter } from "styles/common";

const EventNotification = ({ color, children, setIsVisible }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<S.EventTitle color={color}>{children}</S.EventTitle>
		</>
	);
};

export default EventNotification;

const EventTitle = styled.div`
	${flexCenter}
	width: 780px;
	height: 30px;
	background-color: ${({ theme, color }) => theme.PALETTE[color]};
	font-weight: 600;
`;

const S = {
	EventTitle,
};
