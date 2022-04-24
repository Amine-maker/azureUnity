import { credentials } from "./utils/data";

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(user, callback) {
    const acc = credentials.find(
      (ids) => user.username === ids.username && user.password === ids.password
    );
    if (acc && acc.allowToPlay) {
      fakeAuthProvider.isAuthenticated = true;
      callback();
    } else {
      if (acc && !acc.allowToPlay) {
        fakeAuthProvider.isAuthenticated = false;
        alert("Vous n'êtes pas autorisé à acceder aux jeux");
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect");
      }
    }
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

export { fakeAuthProvider };
