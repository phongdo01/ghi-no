import * as firebase from 'firebase';
//product
// var firebaseConfig = {
//     apiKey: "AIzaSyCkUIIxC-BZWL4nPJoHJAxHUpoKTj6TuT4",
//     authDomain: "ghi-no.firebaseapp.com",
//     databaseURL: "https://ghi-no.firebaseio.com",
//     projectId: "ghi-no",
//     storageBucket: "ghi-no.appspot.com",
//     messagingSenderId: "449564265345",
//     appId: "1:449564265345:web:25b3f7f37c7f48ec727680",
//     measurementId: "G-EJGDGFYR24"
//   };
//dev 

  var firebaseConfig = {
    apiKey: "AIzaSyAbMEnbT6tPwOFCrtbA8u-KtdxhY0eN0HE",
    authDomain: "test-33852.firebaseapp.com",
    databaseURL: "https://test-33852-default-rtdb.firebaseio.com",
    projectId: "test-33852",
    storageBucket: "test-33852.appspot.com",
    messagingSenderId: "674838361413",
    appId: "1:674838361413:web:b704d188a0f7b9f634fa2c",
    measurementId: "G-CQN0FGV37D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  export default firebase;