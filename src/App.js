import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import StartPage from './pages/start/start'
import CalculatorPage from './pages/calculator/calculator'
import ConsolePage from './pages/console/console'
import DownloadPage from './pages/download/download'
import SettingsPage from './pages/settings/settings'
import SRMPage from './pages/SRM/SRM'
import NotFoundedPage from "./pages/NotFounded/NotFounded";
import TodoPage from "./pages/todo/todo";


import Header from './components/header/header'
import Slider from './components/slider/slider'
import Startmenu from './components/startmenu/startmenu'
import Menu from './components/menu/menu'
import Footer from "./components/footer/footer";

export default function App() {

    const [MenuOpen, setMenuOpen] = useState(false)
    const [Routers, setRouters] = useState([
        {
            content: <StartPage><Slider /><Startmenu /></StartPage>,
            url: '/'
        },
        {
            content: <CalculatorPage />,
            url: '/Calculator'
        },
        {
            content: <ConsolePage />,
            url: '/Console'
        },
        {
            content: <DownloadPage />,
            url: '/Download'
        },
        {
            content: <SRMPage />,
            url: '/SocialRatingMiner'
        },
        {
            content: <SettingsPage />,
            url: '/Settings'
        },
        {
            content: <TodoPage />,
            url: '/Todo'
        },
        {
            content: <NotFoundedPage />,
            url: '*'
        },
    ])

    function MenuActivation(value) {
        return setMenuOpen((MenuOpen) => !MenuOpen);
    }

    return (
        <div className="app">
            <BrowserRouter>
                <Header BurgerChange={MenuActivation} />
                <Menu MenuChanges={MenuOpen} />
                <Routes>
                    {Routers.map((item) => {
                        return <Route path={item.url} element={item.content} />
                    })}
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

