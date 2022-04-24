import React from "react";
import "./styles.css";
import LoginComponent from "./components/loginFormComponent";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { fakeAuthProvider } from "./auth";
import GamePageComponent from "./components/gamePageComponent";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/games"
            element={
              <RequireAuth>
                <GamePageComponent />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

let AuthContext = React.createContext(null);

function Layout() {
  return (
    <div>
      <nav className="nav-fixed">
        <AuthStatus />
        <div className="flex">
          <button>
            <Link className="nav-link" to="/">
              Accueil.
            </Link>
          </button>
          <button>
            <Link className="nav-link" to="/games">
              Mes jeux.
            </Link>
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(newUser, () => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(AuthContext);
};

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>Vous n'êtes pas connecter.</p>;
  }

  return (
    <p>
      Bienvenue {auth.user.username} !
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Déconnexion
      </button>
    </p>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
