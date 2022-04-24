import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imgHeader from "../assets/images/0b447c2fb9c964785f97fb41cf76b619.jpg";
import { useAuth } from "../App";

const LoginComponent = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/games";
  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    auth.signin(payload, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <span className="login100-form-title p-b-43">Bienvenue.</span>
            <div className="wrap-input100 validate-input">
              <input
                type="text"
                placeholder=" "
                name="username"
                required
                className="input-cal input-shadow-focus"
              />
              <label className="label-input">Nom d'utilisateur</label>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Mot de passe requis"
            >
              <input
                type="password"
                placeholder=" "
                name="password"
                required
                className="input-shadow-focus input-cal"
              />
              <label className="label-input">Mot de passe</label>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Connexion
              </button>
            </div>
          </form>
          <div
            className="login100-more"
            style={{
              backgroundImage: `url(${imgHeader})`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
