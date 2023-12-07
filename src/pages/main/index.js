import React, { useState } from "react";
import MainPage from "../../components/main";
import NavigationBar from "../../components/navigationBar";

function Main() {
    const [map, setMap] = useState();
    const [contents, setContents] = useState();
    const [coordArray, setCoordArray] = useState([]);
    const [location, setLoacation] = useState({
        name: "",
        coord: {
            lat: 0,
            lng: 0,
        },
    }); // 현재 위치를 저장할 상태
    const [markers, setMarkers] = useState([]);

    return (
        <>
            <NavigationBar
                map={map}
                contents={contents}
                setContents={setContents}
                coordArray={coordArray}
                setCoordArray={setCoordArray}
                markers={markers}
                location={location}
            />
            <MainPage
                setMap={setMap}
                map={map}
                contents={contents}
                coordArray={coordArray}
                location={location}
                setLoacation={setLoacation}
                markers={markers}
                setMarkers={setMarkers}
            />
        </>
    );
}

export default Main;
