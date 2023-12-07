import styled from "styled-components";
import { useState } from "react";
import { shareKakao } from "../../utils/shareKakao";
import sortImg from "../../assets/svg/sort.svg";

export default function SearchList({ markers, location }) {
    const { kakao } = window;
    const [sortType, setSortType] = useState(true);

    const polyline = (x, y) => {
        return new kakao.maps.Polyline({
            /* map:map, */
            path: [
                new kakao.maps.LatLng(location.coord.lng, location.coord.lat),
                new kakao.maps.LatLng(Number(x), Number(y)),
            ],
            strokeWeight: 2,
            strokeColor: "#FF00FF",
            strokeOpacity: 0.8,
            strokeStyle: "dashed",
        }).getLength();
    };

    return (
        <Container>
            <BtnWrapper>
                <Title>검색된 장소</Title>
                <SortBtn onClick={() => setSortType((prev) => !prev)}>
                    <SortImg src={sortImg} alt="" $sortType={sortType} />
                    {sortType ? "가까운 순" : "먼 순"}
                </SortBtn>
            </BtnWrapper>
            {markers
                .sort((a, b) =>
                    sortType
                        ? polyline(a.x, a.y) - polyline(b.x, b.y)
                        : polyline(b.x, b.y) - polyline(a.x, a.y)
                )
                .map((item) => {
                    return (
                        <CoordBox key={item.id}>
                            <AdderessText>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {item.place_name
                                        ? item.place_name
                                        : item.address_name}
                                </div>
                                {item.place_name && (
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.address_name}
                                    </div>
                                )}
                                <div
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {`거리: ${Math.floor(
                                        polyline(item.x, item.y)
                                    )}m`}
                                </div>
                            </AdderessText>
                            <LinkBox>
                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        shareKakao(
                                            item.place_url,
                                            item.place_name,
                                            item.category_name
                                        )
                                    }
                                >
                                    공유하기
                                </div>
                                •
                                <a
                                    style={{ cursor: "pointer" }}
                                    href={`https://map.kakao.com/link/to/${item.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    길찾기
                                </a>
                            </LinkBox>
                        </CoordBox>
                    );
                })}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0c0c0;
    border-right: 4px solid #f0e4d7;
    overflow: scroll;
    gap: 10px;
    padding: 20px 0;
`;

const CoordBox = styled.div`
    position: relative;
    width: 90%;
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #f0e4d7;
    border: 2px solid #ff7171;
    border-radius: 10px;
    padding: 10px;
`;

const AdderessText = styled.div`
    display: flex;
    height: 100px;
    flex-direction: column;
    justify-content: center;
    line-height: 20px;
    margin-left: 10px;
    gap: 5px;
`;

const LinkBox = styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #3d75cc;
    display: flex;
`;

const BtnWrapper = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 700;
`;

const SortBtn = styled.button`
    position: relative;
    width: 102px;
    height: 45px;
    display: flex;
    padding-left: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 2px solid #ff7171;
    background: #f0e4d7;
    font-size: 14px;
    font-weight: 700;
    gap: 10px;
    cursor: pointer;
    &:disabled {
        background: #eeeeee;
        cursor: not-allowed;
    }
`;

const SortImg = styled.img`
    rotate: ${({ $sortType }) => ($sortType ? "180deg" : "0deg")};
    transition: 0.5s;
    position: absolute;
    left: 14px;
`;
