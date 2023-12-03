import styled from "styled-components";
import Game from "../../assets/svg/placeHeader/Game.svg";
import Ball from "../../assets/svg/placeHeader/Ball.svg";
import Bed from "../../assets/svg/placeHeader/Bed.svg";
import Coffee from "../../assets/svg/placeHeader/Coffee.svg";
import Spoon from "../../assets/svg/placeHeader/Spoon.svg";
import { useState } from "react";
import { randomMarkerImg } from "../../utils/getMarkerImg";

export default function Finder({
    contents,
    setContents,
    setCoordArray,
    coordArray,
}) {
    const { kakao } = window;
    var geocoder = new kakao.maps.services.Geocoder();

    const [title, setTitle] = useState("Spoon");
    const [search, setSearch] = useState();
    const [juso, setJuso] = useState();

    // 음식점 - 한식 / 중식 / 양식 / 일식
    // 카페 - 보드카페 / 카페
    // 스포츠 - 당구장 / 볼링장 / 탁구장
    // 여가 - pc방 / 노래방
    // 숙박업소 - 호텔 / 모텔 / 게스트하우스
    const contentsArray = {
        Spoon: ["한식", "중식", "양식", "일식"],
        Coffee: ["보드카페", "카페"],
        Ball: ["당구장", "볼링장", "탁구장"],
        Game: ["PC방", "노래방"],
        Bed: ["호텔", "모텔", "게스트하우스"],
    };

    const headerClickEvent = (title) => {
        setTitle(title);
    };

    const handleOpenPopup = () => {
        const width = 500;
        const height = 400;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
            "/address",
            "로그인 중...",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        const intervalId = setInterval(() => {
            if (popup.closed) {
                clearInterval(intervalId);
                const address = localStorage.getItem("address");
                geocoder.addressSearch(address, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        // setJuso({
                        //     name: result[0].address.address_name,
                        //     address: { lat: result[0].y, lng: result[0].x },
                        // });
                        setJuso(result[0]);
                    }
                });
            }
        }, 100);
    };

    const addCoords = () => {
        setCoordArray((prev) => [...prev, juso]);
        setJuso("");
    };

    return (
        <Container>
            {!!coordArray.length && (
                <>
                    <SearchWrapper>
                        <SearchInput
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setContents(search);
                                }
                            }}
                            placeholder="찾고 싶은 곳을 검색해주세요."
                            style={{ width: "85%" }}
                        />
                        <Btn
                            style={{ width: "13.5%" }}
                            onClick={() => setContents(search)}
                            disabled={!search}
                        >
                            검색
                        </Btn>
                    </SearchWrapper>
                    <HeaderImgWrapper>
                        <HeaderImg
                            src={Spoon}
                            alt=""
                            width={50}
                            height={50}
                            style={{ opacity: title === "Spoon" ? 1 : 0.5 }}
                            onClick={() => {
                                headerClickEvent("Spoon");
                            }}
                        />
                        <HeaderImg
                            src={Coffee}
                            alt=""
                            width={45}
                            height={45}
                            style={{ opacity: title === "Coffee" ? 1 : 0.5 }}
                            onClick={() => {
                                headerClickEvent("Coffee");
                            }}
                        />
                        <HeaderImg
                            src={Ball}
                            alt=""
                            width={50}
                            height={50}
                            style={{ opacity: title === "Ball" ? 1 : 0.5 }}
                            onClick={() => {
                                headerClickEvent("Ball");
                            }}
                        />
                        <HeaderImg
                            src={Game}
                            alt=""
                            width={55}
                            height={55}
                            style={{ opacity: title === "Game" ? 1 : 0.5 }}
                            onClick={() => {
                                headerClickEvent("Game");
                            }}
                        />
                        <HeaderImg
                            src={Bed}
                            alt=""
                            width={60}
                            height={60}
                            style={{ opacity: title === "Bed" ? 1 : 0.5 }}
                            onClick={() => {
                                headerClickEvent("Bed");
                            }}
                        />
                    </HeaderImgWrapper>
                    <CheckBoxWrapper>
                        {contentsArray[title].map((item, i) => {
                            return (
                                <CheckBoxLabel key={i}>
                                    <CheckBoxStyle
                                        type="checkbox"
                                        checked={contents === item}
                                        onChange={() => setContents(item)}
                                    />
                                    {item}
                                </CheckBoxLabel>
                            );
                        })}
                    </CheckBoxWrapper>
                </>
            )}
            <AddressWrapper>
                <InputWrapper>
                    <AddressInput
                        value={
                            juso?.address?.address_name
                                ? juso?.address?.address_name
                                : ""
                        }
                        disabled={true}
                        placeholder="주소 찾기를 눌러 주소를 입력해주세요."
                        style={{ width: "75%" }}
                    />
                    <Btn style={{ width: "23.5%" }} onClick={handleOpenPopup}>
                        주소 찾기
                    </Btn>
                </InputWrapper>
                <Btn
                    style={{ width: "100%", marginBottom: "20px" }}
                    onClick={addCoords}
                    disabled={!juso?.address?.address_name}
                >
                    추가
                </Btn>
                {coordArray.map((item, i) => {
                    return (
                        <CoordBox key={item.road_address.zone_no}>
                            <img src={randomMarkerImg(i)} alt="" />
                            <AdderessText>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {item.road_address.building_name
                                        ? item.road_address.building_name
                                        : item.address.address_name}
                                </div>
                                {item.road_address.building_name && (
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.road_address.building_name
                                            ? item.address.address_name
                                            : item.address_name}
                                    </div>
                                )}
                            </AdderessText>
                            <XBtn
                                onClick={() => {
                                    setCoordArray((prev) =>
                                        prev.filter(
                                            (filterItem) =>
                                                filterItem.address_name !==
                                                item.address_name
                                        )
                                    );
                                    setContents("");
                                }}
                            >
                                x
                            </XBtn>
                        </CoordBox>
                    );
                })}
            </AddressWrapper>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0c0c0;
    border-right: 4px solid #f0e4d7;
`;

const HeaderImgWrapper = styled.div`
    width: 100%;
    border-top: 4px solid #f0e4d7;
    border-bottom: 4px solid #f0e4d7;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #ff7171;
`;

const HeaderImg = styled.img`
    cursor: pointer;
`;

const CheckBoxWrapper = styled.div`
    width: 100%;
    border-bottom: 4px solid #f0e4d7;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 25px;
    gap: 15px;
`;

const CheckBoxStyle = styled.input`
    appearance: none;
    width: 24px;
    height: 24px;
    margin: 0;
    border: 2px solid #999999;
    border-radius: 7px;
    &:checked {
        border-color: transparent;
        background-image: url("/Check.svg");
        background-size: 80% 80%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #ff7171;
    }
`;

const CheckBoxLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    gap: 8px;
    cursor: pointer;
`;

const AddressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 5px;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AddressInput = styled.input`
    height: 40px;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 10px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    cursor: not-allowed;
`;

const Btn = styled.button`
    height: 40px;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover {
        background-color: ${(disabled) => !disabled && "#f0edd7"};
    }
`;

const CoordBox = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 10px;
    padding: 10px;
`;

const AdderessText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    margin-left: 10px;
`;

const XBtn = styled.button`
    position: absolute;
    top: 2px;
    right: 4px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 20px;
    justify-content: space-between;
`;

const SearchInput = styled.input`
    height: 40px;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 10px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
`;
