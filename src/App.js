import React from "react";
import { GlobalStyle } from "./styles/gloablStyle.style";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddressPage from "./pages/address";
import Main from "./pages/main";
import Intro from "./pages/intro";

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/address" element={<AddressPage />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
