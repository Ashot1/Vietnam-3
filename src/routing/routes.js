import StartPage from "../pages/start/startPage";
import CalculatorPage from "../pages/calculator/calculatorPage";
import ConsolePage from "../pages/console/consolePage";
import DownloadPage from "../pages/download/downloadPage";
import SRMPage from "../pages/SRM/SRMPage";
import NotFoundedPage from "../pages/NotFounded/NotFoundedPage";

// import {lazy} from "react";
//
// const StartPage = lazy(() => import("../pages/start/startPage")),
// 	CalculatorPage = lazy(() => import("../pages/calculator/calculatorPage")),
// 	ConsolePage = lazy(() => import("../pages/console/consolePage")),
// 	DownloadPage = lazy(() => import("../pages/download/downloadPage")),
// 	SRMPage = lazy(() => import("../pages/SRM/SRMPage")),
// 	NotFoundedPage = lazy(() => import("../pages/NotFounded/NotFoundedPage"));

export const routes = [
	{path: '/', component: <StartPage/>},
	{path: '/Calculator', component: <CalculatorPage/>},
	{path: '/Console', component: <ConsolePage/>},
	{path: '/Download', component: <DownloadPage/>},
	{path: '/SocialRatingMiner', component: <SRMPage/>},
	{path: '*', component: <NotFoundedPage/>},
]