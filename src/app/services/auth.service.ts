import {Injectable} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {addDoc, collection, getDocs, getFirestore, query, where, runTransaction} from 'firebase/firestore'
import {environment} from 'src/environments/environment';
import {doc} from "rxfire/firestore";
import {transition} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  firebase = initializeApp(environment.firebaseConfig);
  googleProvider = new GoogleAuthProvider();
  auth = getAuth();
  db = getFirestore();
  isLogged = false;

  constructor(
  ) {
  }

  ngOnInit() {
  }


  // Sign in with Google
  public GoogleAuth() {

    signInWithPopup(this.auth, this.googleProvider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential) {
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        //Setting up user logged variable
        this.isLogged = true;

        // The users data collection reference to firestore
        const usersRef = collection(this.db, "users");

        console.log('Succesfully logged in: ');

        // Try inserting user data into users data collection (if not already present)
          const existsQuery = query(usersRef, where("email","==",user.email));
          const existsQuerySnapshot = await getDocs(existsQuery);

          //TODO
          existsQuerySnapshot.forEach(result => {
              //update user UID in database

          });

          if(existsQuerySnapshot.empty) {
            try {
              const docRef = await addDoc(usersRef, {
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              displayName: user.displayName
              });
              console.log("Document written with ID: ", docRef.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          } else {
            // existsQuerySnapshot.forEach(async result => {
            //   const uidCheckValue = result.get("uid");
            //   if(user.uid !== uidCheckValue) {
            //     //TODO:update user UID in database
            //     // HINT console.log(result.id); use this result ID, it needs documentReference
            //     await runTransaction(this.db, async(transition) => {
            //       // HINT guarda https://firebase.google.com/docs/firestore/manage-data/transactions#transactions
            //     });
            //   }
            // });
          }
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  public async googleSignOut() {
    await signOut(this.auth);
    this.isLogged = false;
    console.log("User successfully logged out.");
    this.googleProvider.setCustomParameters({prompt: 'select_account'});
  }

}
