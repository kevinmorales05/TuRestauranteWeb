import app from "firebase/app";
import firebaseConfig from "./config";
import 'firebase/firestore';
import 'firebase/storage';
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.storage = app.storage();
  }
}
const firebase = new Firebase();
export default firebase;


/*
si hay un error se puede colocar esto dentro del constructor
if(!app.apps.length){
  app.initializeApp(firebaseConfig)
}
*/