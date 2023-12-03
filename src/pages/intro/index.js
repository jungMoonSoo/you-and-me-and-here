import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Intro() {
    const navigator = useNavigate();
    return (
        <Container>
            <Wrapper>
                <TitleText>너 나 우리, 그리고 여기</TitleText>
                <ContentsText>제 시간에 5조</ContentsText>
                <Btn onClick={() => navigator("/main")}>시작!</Btn>
                <TeamList>
                    <Team>정문수</Team>
                    <Team>김민혁</Team>
                    <Team>신승혁</Team>
                    <Team>이재민</Team>
                </TeamList>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f0e4d7;
    display: flex;
    align-items: center;
`;

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 80vh;
    background-color: #f5c0c0;
    border-top: 4px solid #f07171;
    border-bottom: 4px solid #f07171;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleText = styled.div`
    font-size: 80px;
    font-weight: 700;
`;

const ContentsText = styled.div`
    font-size: 40px;
    font-weight: 700;
`;

const Btn = styled.button`
    width: 300px;
    height: 120px;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 30px;
    font-size: 60px;
    font-weight: 700;
    margin-top: 100px;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover {
        background-color: ${(disabled) => !disabled && "#f0edd7"};
    }
`;

const TeamList = styled.ul`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const Team = styled.li`
    font-size: 25px;
    font-weight: 700;
    margin-top: 10px;
`;
