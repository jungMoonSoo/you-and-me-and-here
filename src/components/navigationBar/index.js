import styled from "styled-components";
import { ReactComponent as Back } from "../../assets/svg/Back.svg";
import OrangeMarker from "../../assets/svg/personMarker/OrangeMarker.svg";
import { useState } from "react";
import Finder from "../finder";

export default function NavigationBar({
    setCoordArray,
    coordArray,
    contents,
    setContents,
}) {
    const [open, setOpen] = useState(false);
    return (
        <Container>
            <NavigationWrapper>
                <img src={OrangeMarker} alt="" />
                <div></div>
            </NavigationWrapper>
            <PageWrapper
                style={{
                    marginLeft: open ? "0px" : "-400px",
                    transition: "0.65s",
                }}
            >
                <Finder
                    contents={contents}
                    setContents={setContents}
                    coordArray={coordArray}
                    setCoordArray={setCoordArray}
                />
                <CloseBtn
                    onClick={() => {
                        setOpen((prev) => !prev);
                    }}
                >
                    <Back
                        width={30}
                        height={30}
                        alt=""
                        fill="#f0c0c0"
                        style={{
                            rotate: open ? "0deg" : "180deg",
                            transition: "0.65s",
                        }}
                    />
                </CloseBtn>
            </PageWrapper>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    z-index: 100;
    position: fixed;
    align-items: center;
`;

const NavigationWrapper = styled.div`
    height: 100vh;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ff7171;
    border-right: 4px solid #f0e4d7;
    padding: 20px 0;
    z-index: 100;
`;

const PageWrapper = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const CloseBtn = styled.div`
    width: 35px;
    height: 100px;
    border-radius: 0 12px 12px 0;
    border: 2px solid #f0e4d7;
    border-left: none;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
