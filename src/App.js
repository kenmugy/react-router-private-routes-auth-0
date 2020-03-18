import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  useLocation,
  useHistory,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <div className='nav-wrapper container'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/account'>Account</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className='container'>
        <AuthButton />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/about'>
            <AboutPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <PrivateRoute to='/account'>
            <AccountPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const FakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function LoginPage() {
  let location = useLocation();
  let history = useHistory();

  const { from } = location.state || {
    from: {
      pathname: '/'
    }
  };

  const login = () => FakeAuth.authenticate(() => history.replace(from));

  return (
    <div className=''>
      <h4>You must login to go to {from.pathname} </h4>

      <button className='btn green' onClick={login}>
        Login
      </button>
    </div>
  );
}
function AuthButton() {
  let history = useHistory();
  return FakeAuth.isAuthenticated ? (
    <div className=''>
      {' '}
      <h5>
        Welcome!!!
        <button
          className='btn red'
          onClick={() => FakeAuth.logout(() => history.push('/'))}>
          Logout
        </button>
      </h5>
    </div>
  ) : (
    <h4 className='red-text'>your not logged in</h4>
  );
}

function HomePage() {
  return (
    <div>
      <h3 className=''>HomePage</h3>
    </div>
  );
}
function AboutPage() {
  return (
    <div>
      <h3 className=''>AboutPage</h3>
    </div>
  );
}
function AccountPage() {
  return (
    <div>
      <h3 className=''>AccountPage</h3>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        FakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location
              }
            }}
          />
        )
      }
    />
  );
}

export default App;
