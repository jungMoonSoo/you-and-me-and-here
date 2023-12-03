import React, { useEffect, useState } from "react";
import Here from "../../assets/svg/Here.svg";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { getPlaceMarkerImg, randomMarkerImg } from "../../utils/getMarkerImg";
import { shareKakao } from "../../utils/shareKakao";

export default function MainPage({ setMap, map, contents, coordArray }) {
    const { kakao } = window;
    const [openInfo, setOpenInfo] = useState(0);
    const [viewMarker, setViewMarker] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [location, setLoacation] = useState({
        name: "",
        coord: {
            lat: 0,
            lng: 0,
        },
    }); // 현재 위치를 저장할 상태

    useEffect(() => {
        successHandler(location.coord); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, contents]);

    useEffect(() => {
        if (!!coordArray.length) {
            setLoacation({
                name: coordArray[0].address.address_name,
                coord: {
                    lat:
                        coordArray
                            .map((item) => Number(item.y))
                            .reduce((yCoord1, yCoord2) => yCoord1 + yCoord2) /
                        coordArray.length,
                    lng:
                        coordArray
                            .map((item) => Number(item.x))
                            .reduce((xCoord1, xCoord2) => xCoord1 + xCoord2) /
                        coordArray.length,
                },
            });
            setViewMarker(true);
            setTimeout(() => {
                let geocoder = new kakao.maps.services.Geocoder();

                let coord = new kakao.maps.LatLng(location.lat, location.lng);
                let callback = function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        console.log(result);
                    }
                };
                geocoder.coord2Address(
                    coord.getLng(),
                    coord.getLat(),
                    callback
                );
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coordArray]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((response) => {
            const { latitude, longitude } = response.coords;
            setLoacation({
                name: "",
                coord: { lat: latitude, lng: longitude },
            });
        }); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const successHandler = (response) => {
        if (!contents) return;
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(
            // 음식점 - 한식 / 중식 / 양식 / 일식
            // 카페 - 보드게임카페 / 카페
            // 스포츠 - 당구장 / 볼링장 / 탁구장
            // 여가 - pc방 / 노래방
            // 숙박업소 - 호텔 / 모텔 / 게스트하우스
            contents,
            (data, _pagination) => {
                setMarkers(data);
            },
            {
                location: new kakao.maps.LatLng(response.lat, response.lng),
                radius: 1500,
            }
        );
    };

    return (
        <Map
            center={location.coord} // 지도의 중심 좌표
            style={{ width: "100vw", height: "100vh" }} // 지도 크기
            level={5} // 지도 확대 레벨
            onCreate={setMap}
            key={[markers, coordArray, location, contents]}
        >
            <MarkerClusterer averageCenter={true} minLevel={6}>
                {markers.map((marker) => {
                    return (
                        <MapMarker
                            key={`marker2-${marker.x},${marker.y}`}
                            image={{
                                src: getPlaceMarkerImg(marker.category_name),
                                size: { width: 60, height: 60 },
                            }}
                            position={{ lat: marker.y, lng: marker.x }}
                            onClick={() =>
                                openInfo === marker.id
                                    ? setOpenInfo(0)
                                    : setOpenInfo(marker.id)
                            }
                        >
                            {openInfo === marker.id && (
                                <TextBox>
                                    <div
                                        style={{
                                            width: "100%",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            wordBreak: "break-all",
                                        }}
                                    >
                                        {marker.place_name}
                                    </div>
                                    <LinkBox>
                                        <div
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                shareKakao(
                                                    marker.place_url,
                                                    marker.place_name,
                                                    marker.category_name
                                                )
                                            }
                                        >
                                            공유하기
                                        </div>
                                        •
                                        <a
                                            style={{ cursor: "pointer" }}
                                            href={`https://map.kakao.com/link/to/${marker.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            길찾기
                                        </a>
                                    </LinkBox>
                                </TextBox>
                            )}
                        </MapMarker>
                    );
                })}
                {coordArray?.map((juso, i) => {
                    return (
                        <MapMarker
                            key={`marker1-${juso.y},${juso.x}`}
                            image={{
                                src: randomMarkerImg(i),
                                size: { width: 60, height: 60 },
                            }}
                            position={{ lat: juso.y, lng: juso.x }}
                            onMouseOver={
                                // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                                () => setOpenInfo(juso.address.address_name)
                            }
                            // 마커에 마우스아웃 이벤트를 등록합니다
                            onMouseOut={
                                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                                () => setOpenInfo(0)
                            }
                        >
                            {openInfo === juso.address.address_name && (
                                <TextBox>
                                    {juso.road_address.building_name
                                        ? juso.road_address.building_name
                                        : juso.address.address_name}
                                </TextBox>
                            )}
                        </MapMarker>
                    );
                })}
            </MarkerClusterer>
            {viewMarker && (
                <MapMarker
                    image={{
                        src: Here,
                        size: { width: 60, height: 60 },
                    }}
                    position={location.coord}
                    onClick={() =>
                        openInfo === "Here"
                            ? setOpenInfo(0)
                            : setOpenInfo("Here")
                    }
                >
                    {openInfo === "Here" && (
                        <TextBox>
                            <div
                                style={{
                                    width: "100%",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    wordBreak: "break-all",
                                }}
                            >
                                {location.name}
                            </div>
                            <LinkBox>
                                <div
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        shareKakao(
                                            `https://map.kakao.com/link/to/현재위치,${location.coord.lat},${location.coord.lng}`,
                                            location.name,
                                            "중앙위치"
                                        )
                                    }
                                >
                                    공유하기
                                </div>
                                •
                                <a
                                    style={{ cursor: "pointer" }}
                                    href={`https://map.kakao.com/link/to/중앙위치,${location.coord.lat},${location.coord.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    길찾기
                                </a>
                            </LinkBox>
                        </TextBox>
                    )}
                </MapMarker>
            )}
        </Map>
    );
}

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
    width: 200px;
    padding: 10px;
    font-size: 16px;
    font-weight: 700;
`;

const LinkBox = styled.div`
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #3d75cc;
    display: flex;
`;
