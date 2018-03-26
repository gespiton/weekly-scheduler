/* eslint-disable no-undef */
import React, {Component} from 'react';

const firebase = window.firebase;

class Auth extends Component {

  toggleSignIn() {
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      var provider = new firebase.auth.GoogleAuthProvider();
      // [END createprovider]
      // [START addscopes]
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithRedirect(provider);
      // [END signin]
    } else {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
  }

  // [END buttoncallback]
  /**
   * initApp handles setting up UI event listeners and registering Firebase auth listeners:
   *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
   *    out, and that is where we update the UI.
   *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
   *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
   */
  initApp() {
    // Result from Redirect auth flow.
    // [START getidptoken]
    let user = {};
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // [START_EXCLUDE]
        document.getElementById('quickstart-oauthtoken').textContent = token;
      } else {
        document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // The signed-in user info.
      user = result.user;
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // [START_EXCLUDE]
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('quickstart-sign-in').textContent = 'Sign out';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        // [END_EXCLUDE]
      } else {
        // User is signed out.
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
        document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        document.getElementById('quickstart-account-details').textContent = 'null';
        document.getElementById('quickstart-oauthtoken').textContent = 'null';
        // [END_EXCLUDE]
      }
      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', this.toggleSignIn, false);
  }


  componentDidMount() {
    this.initApp();
  }

  render() {
    return (
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

        {/* <!-- Header section containing title --> */}
        <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
            <div
              className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop">
              <a href="/"><h3>Firebase Authentication</h3></a>
            </div>
          </div>
        </header>

        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

            {/* <!-- Container for the demo --> */}
            <div
              className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
              <div className="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
                <h2 className="mdl-card__title-text">Google Authentication with Redirect</h2>
              </div>
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <p>Sign in with your Google account below.</p>

                {/* <!-- Button that handles sign-in/sign-out --> */}
                <button disabled className="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in">Sign in
                  with Google
                </button>

                {/* <!-- Container where we'll display the user details --> */}
                <div className="quickstart-user-details-container">
                  Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
                  <div>Firebase auth <code>currentUser</code> object value:</div>
                  <pre><code id="quickstart-account-details">null</code></pre>
                  <div>Google OAuth Access Token:</div>
                  <pre><code id="quickstart-oauthtoken">null</code></pre>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Auth;
