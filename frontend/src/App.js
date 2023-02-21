import './App.css';
import Home from './components/user/Employee/Home';
import History from './components/user/Employee/History';
import Drinks from './components/user/Employee/Drinks';
import Foods from './components/user/Employee/Foods';
import Nav from './components/user/Employee/Nav';
import Cafeteria from './components/user/Cafeteria/1_cf_home'
import Cafeteria_History from './components/user/Cafeteria/2_cf_history'
import Login from './components/Account/Login'
import ResetPassword from './components/Account/ResetPassword'
import ForgetPassword from './components/Account/ForgetPassword'
import ExportData from './components/user/HR/ExportData';
import NotFound from './components/Error/NotFound'
import { useLocation, Routes ,Route} from 'react-router-dom';
import React from 'react';
import { RequireAuth} from 'react-auth-kit';
import { Layout } from 'antd';
import {LinkedinFilled,GithubFilled} from '@ant-design/icons';
const {Content, Footer } = Layout;
function App()  {
   const location = useLocation();
  return (
    <Layout>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}>
          {!["/cafeteria", "/login","/forget-password","/export-data","/cafeteria/history"].includes(location.pathname) && <Nav/>}
     
          <Routes onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/" element={<RequireAuth loginPath={'/login'}><Home/></RequireAuth>}/>
                <Route path="/history" element={<RequireAuth loginPath={'/login'}><History/></RequireAuth>}/>
                <Route path="/drinks" element={<RequireAuth loginPath={'/login'}><Drinks/></RequireAuth>}/>
                <Route path="/foods" element={<RequireAuth loginPath={'/login'}><Foods/></RequireAuth>}/>
                <Route path="/cafeteria" element={<RequireAuth loginPath={'/login'}><Cafeteria/></RequireAuth>}/>
                <Route path="/cafeteria/history" element={<RequireAuth loginPath={'/login'}><Cafeteria_History/></RequireAuth>}/>  
                <Route path="/login" element={<Login/>}/>  
                <Route path="/reset-password/:token" element={<ResetPassword/>}/> 
                <Route path="/forget-password/" element={<ForgetPassword/>}/>
                <Route path="/export-data"element={<RequireAuth loginPath={'/login'}><ExportData/></RequireAuth>}/>    
                <Route path='*' element={<NotFound/>}/>
          </Routes>
    </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Developed by Ramy Helwa ©2023<br/><br/>
        <a href="https://www.linkedin.com/in/ramy-helwa-13a875106/"><LinkedinFilled href='' style={{ fontSize: '35px', color: '#08c', paddingRight:'20px'}}  /></a>
        <a href="https://github.com/rhelwa96/"><GithubFilled style={{ fontSize: '35px', color: '#171515' }}  /></a>
      </Footer>
    </Layout>
  );
};
export default App;