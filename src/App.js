import { Routes,Route } from 'react-router-dom';
import './App.css';
import Edit from './pages/Edit';
import Feature from './pages/Feature';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Post from './pages/Post';
import Register from './pages/Register';
import SendOtp from './pages/SendOtp';
import ShowPost from './pages/ShowPost';
import SinglePost from './pages/SinglePost';
import VerifyOtp from './pages/VerifyOtp';
import UserContextProvider from './userContext';

function App() {
  return (
    <>
     <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/login' element={<Login  />} />
          <Route path='/register' element={<Register  />} />
          <Route path='/post' element={<Post  />} />
          <Route path='/show' element={<ShowPost  />} />
          <Route path='/edit/:id' element={<Edit  />} />
          <Route path="/send-otp" element={<SendOtp />} />
          <Route path="/verify-otp/:email" element={<VerifyOtp />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/feature" element={<Feature />} />
        </Route>
      </Routes>
      </UserContextProvider>
    </ >
  );
}

export default App;
