import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//import componenets
import Footer from './components/Footer/Footer';


//import pages
import Home from './pages/Home';
import Login from './pages/Login';
import MaidLogin from './pages/MaidLogin';
import Signup from './pages/Signup';
//import Rating from './components/Rating';
// import UserDashboard from './pages/UserDashboard';
// import MaidDashboard from "./pages/MaidDashboard";

//setup graphql and auth
const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    return (
      <div className='page-container'>
        <div className='content-wrap'>
        <ApolloProvider client={client}>
          <Router> 
              <Routes>
                <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/maidlogin" element={<MaidLogin/>} />
                  <Route path="/signup" element={<Signup/>} />
                  {/* <Route path="/maiddashboard" element={<MaidDashboard/>} /> */}

              </Routes>
          </Router>
        </ApolloProvider>
        <Footer/>
        </div>
      </div>

    );
}

export default App;