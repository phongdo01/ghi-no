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
    apiKey: "AIzaSyAREsU8WRJeaISQztIapMUGIUYB7tAMiK8",
    authDomain: "test-ghi-no.firebaseapp.com",
    databaseURL: "https://test-ghi-no.firebaseio.com",
    projectId: "test-ghi-no",
    storageBucket: "test-ghi-no.appspot.com",
    messagingSenderId: "421898354366",
    appId: "1:421898354366:web:f647d1dc1148ca75d728ef",
    measurementId: "G-397K9ZJX9M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  export default firebase;