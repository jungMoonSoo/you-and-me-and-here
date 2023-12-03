import React, { useState } from "react";
import MainPage from "../../components/main";
import NavigationBar from "../../components/navigationBar";

function Main() {
    const [map, setMap] = useState();
    const [contents, setContents] = useState();
    const [coordArray, setCoordArray] = useState([]);
    return (
        <>
            <NavigationBar
                map={map}
                contents={contents}
                setContents={setContents}
                coordArray={coordArray}
                setCoordArray={setCoordArray}
            />
            <MainPage
                setMap={setMap}
                map={map}
                contents={contents}
                coordArray={coordArray}
            />
        </>
    );
}

export default Main;
