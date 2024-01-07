import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProSidebarProvider} from 'react-pro-sidebar'
import LogIn from './pages/Login';
import Userdash from './pages/user/Userdash';
// import UserRoute from './component/UserRoute';
import Layout from './pages/global/Layout';
import LandingPage from './pages/user/LandingPage';
import CreateJobPost from './pages/CreateJobPost'
import AuthRoute from './component/authRoute';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoutes';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';



//HOC
// const UserDashBoardHOC = Layout(Userdash);



const App = ({setIsAuth,isAuth}) => {
    
    // const []=useState(false);
    // const [isAuthenticated , setIsAuthenticated] = useState(false);
    // console.log(isAuth);

    // console.log(isAuthenticated);

    return (
        <>
       
        <ToastContainer/>
        
            <ThemeProvider theme={theme}>
            <ProSidebarProvider>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search/location/:location' element={<Home />} />
                        <Route path='/search/:keyword' element={<Home />} />
                        <Route path='/login' element={<LogIn setIsAuth={setIsAuth} />} />
                        <Route path="/job/:id" element={<LandingPage/>} />
                        {/* <Route
                         path="/createpost" 
                         element={
                         <ProtectedRoute isAuth={isAuth}>
                        <CreateJobPost />
                        </ProtectedRoute>
                         }
                         /> */}
                         {/* <Route path='/createpost' element={isAuth?<CreateJobPost/>:<Navigate to='/login'/>}/> */}
                        <Route path="/createpost" element={<CreateJobPost isAuth={isAuth}/>}/>
                        {/* <Route path="/userdashboard" element={<AuthRoute isAuth={isAuth} component={Userdash} />}/> */}
                        <Route path="/userdashboard" element={<Userdash isAuth={isAuth} component={Userdash} />} />

                       
                       
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App