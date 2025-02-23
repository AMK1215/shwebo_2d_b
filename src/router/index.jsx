import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import TwoDPage from "../pages/TwoD";
import TwoDBetPage from "../pages/TwoDBet";
 import ThreeDAMyanChoosePage from "../pages/ThreeDAMyanChoose";
import ThreeDConfirmPage from "../pages/ThreeDConfirm";
import TwoDConfirmPage from "../pages/TwoDConfirm";
import ThreeDBetPage from "../pages/ThreeDBet";
import ThreeDPage from "../pages/ThreeD";
import ThreeDResultsPage from "../pages/ThreeDResults";
import ThreeDWinnersPage from "../pages/ThreeDWinners";
import ThreeDHolidaysPage from "../pages/ThreeDHolidays";
import GamePage from "../pages/Slot/GamePage";
import WalletPage from "../pages/Wallet";
import TopUpBankPage from "../pages/TopUpBank";
import TopUpPage from "../pages/TopUp";
import TopUpConfirmPage from "../pages/TopUpConfirm";
import WithDrawPage from "../pages/WithDraw";
 import WithDrawConfirmPage from "../pages/WithDrawConfirm";
import PromotionPage from "../pages/Promotion";
import PromotionDetaisPage from "../pages/PromotionDetais";
import WalletHistoryPage from "../pages/WalletHistory";
import ProfilePage from "../pages/Profile";
import TwoDWinnersPage from "../pages/TwoDWinners";
import TwoDLivePage from "../pages/TwoDLive";
import ThreeDLivePage from "../pages/ThreeDLive";
import TwoDResultsPage from "../pages/TwoDResults";
import TwoDHoliday from "../pages/TwoDHoliday";
import HelpPage from "../pages/Help";
import MessagePage from "../pages/Message";
import GameLog from "../pages/Slot/GameLog";
import InternalTransfer from "../pages/Slot/InternalTransfer";
import TwoDHistory from "../pages/TwoDHistory";
import Transaction from "../pages/Slot/Transaction";
import UserProfilePage from "../pages/UserProfile";
import ChangePasswordPage from "../pages/ChangePassword";
import ThreeDHistory from "../pages/ThreeDHistory";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            //Slots
            {
                path : '/slots',
                children:[
                    {
                        index:true,
                        element:<GamePage/>
                    },
                    {
                        path: 'gameLogs',
                        element: <GameLog />
                    }, 
                    {
                        path: 'transactions',
                        element: <Transaction />
                    }
                 ]
            },
            {
                path : '/2d',
                children:[
                    {
                        index:true,
                        element:<TwoDPage/>
                    },
                    {
                        path:'bet',
                        element:<TwoDBetPage/>
                    },
                    {
                        path:'confirm',
                        element:<TwoDConfirmPage/>
                    },
                    {
                        path:'history',
                        element: <TwoDHistory />
                    },
                    {
                        path:'winners',
                        element:<TwoDWinnersPage/>
                    },
                    {
                        path:'live',
                        element:<TwoDLivePage/>
                    },
                    {
                        path:'results',
                        element:<TwoDResultsPage/>
                    },
                    {
                        path:'holiday',
                        element:<TwoDHoliday/>
                    },
                ]
            },
            {
                path : '/3d',
                children:[
                    {
                        index:true,
                        element:<ThreeDPage/>
                    },
                    {
                        path: 'history',
                        element: <ThreeDHistory/>
                    },
                    {
                        path:'results',
                        element:<ThreeDResultsPage/>
                    },
                    {
                        path:'winners',
                        element:<ThreeDWinnersPage/>
                    },
                    {
                        path:'holidays',
                        element:<ThreeDHolidaysPage/>
                    },
                    {
                        path:'bet',
                        element:<ThreeDBetPage/>
                    },
                    {
                        path:'amyan-choose',
                        element:<ThreeDAMyanChoosePage/>
                    },
                    {
                        path:'confirm',
                        element:<ThreeDConfirmPage/>
                    },
                    {
                        path:'live',
                        element:<ThreeDLivePage/>
                    }
                ]
            },
            {
                path : '/help',
                element : <HelpPage />
            },
            {
                path : '/message',
                element : <MessagePage />
            },
            {
                path : '/account',
                element : <ProfilePage />
            },
            {
                path : '/profile',
                element : <UserProfilePage />
            },
            {
                path : '/change-password',
                element : <ChangePasswordPage />
            },
            {
                path : '/wallet',
                element : <WalletPage />
            },
            {
                path: '/wallet/internal-transfer',
                element: <InternalTransfer />
            },
            {
                path:'/wallet-history',
                element:<WalletHistoryPage/>
            },
            {
                path : '/top-up/bank',
                element : <TopUpBankPage />
            },
            {
                path : '/top-up/',
                element : <TopUpPage />
            },
            {
                path : '/top-up/confirm',
                element : <TopUpConfirmPage />
            },
            {
                path : '/with-draw/',
                element : <WithDrawPage />
            },
            
            {
                path : '/with-draw/confirm',
                element : <WithDrawConfirmPage />
            },
            {
                path : '/promotion',
                element : <PromotionPage />
            },
            {
                path : '/promotion/:promotionId',
                element : <PromotionDetaisPage />
            },
        ]
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path : '/register',
        element : <Register />
    },
    {
        path : '*',
        element : <NotFound />
    }
])

export default router;