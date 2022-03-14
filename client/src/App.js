import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//import componenets
import Header from './components/Header';
import Footer from './components/Footer';

//import pages
import Home from './pages/Home';
import Login from './pages/Login';
import MaidDashboard from './pages/MaidDashboard';
import NoMatch from './pages/NoMatch';
import SingleReview from './pages/SingleReview';
import UserDashboard from './pages/UserDashboard';
import Signup from './pages/Signup';
import NavBar from './components/Navbar';

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
        <ApolloProvider client={client}>
          <Router>  
              <div>
              <NavBar />
              <div>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/dashboard/:username?" component={UserDashboard} />
                    <Route exact path="/review/:id" component={SingleReview} />
                    <Route exact path="/employee/:id" component={MaidDashboard} />
                  </Switch>
              </div>
              <Footer />
              </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;