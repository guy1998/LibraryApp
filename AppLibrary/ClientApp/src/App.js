import ReportPage from './components/ReportPage';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router-dom';
import BookView from './components/BookView';
import InitialPage from "./components/InitialPage";
import { useEffect, useState } from "react";
import BookInfo from "./components/BookInfo.js";

function App() {

    const [notification, setNotification] = useState(<div style={{ display: "none" }} ></div>);

    const handleSetNotification = (note) => {
        setNotification(note);

        setTimeout(() => {
            setNotification(<div style={{ display: "none" }} ></div>)
        }, 4000)
    }

    return (
        <>
            <div style={{ backgroundColor: "powderblue", height: "100vh", display: "flex", overflow: "auto", padding: "0"}}>
                <Routes>
                    <Route path="/authorPanel" element={<ReportPage handleNotification={handleSetNotification}></ReportPage>}></Route>
                    <Route path="/bookPanel" element={<BookView handleNotification={handleSetNotification}></BookView>}></Route>
                    <Route path="/home" element={<HomePage handleNotification={handleSetNotification}></HomePage>}></Route>
                    <Route path="/" element={<InitialPage handleNotification={handleSetNotification} />} />
                </Routes>
                {notification}
            </div>
        </>
    );
}

export default App;