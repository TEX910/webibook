import {Injectable, OnInit} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {addDoc, collection, getDocs, getFirestore, query, where, updateDoc, doc} from 'firebase/firestore'
import {environment} from 'src/environments/environment';
import {transition} from "@angular/animations";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService implements OnInit{

  firebase = initializeApp(environment.firebaseConfig);
  googleProvider = new GoogleAuthProvider();
  auth = getAuth();
  db = getFirestore();
  isLogged = false;
  sessionToken = '';

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
      if(credential?.accessToken) {
        let userLogged: User = {
          uid: result.user.uid,
          email: <String>result.user.email,
          photoURL: <String>result.user.photoURL,
          displayName: <String>result.user.displayName
        }
        await this.initializeSession(credential.accessToken, userLogged);
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

  public async initializeSession(accessToken: string, userLogged: User) {
    //Setting up the session token
    this.sessionToken = accessToken;
    //Setting up user logged variable
    this.isLogged = true;

    console.log('Succesfully logged in.');

    await this.setupFirestoreUserFile(userLogged);
  }

  private async setupFirestoreUserFile(userLogged: User) {
    // The users data collection reference to firestore
    const usersRef = collection(this.db, "users");

    // Try inserting user data into users data collection (if not already present)
    const existsQuery = query(usersRef, where("email", "==", userLogged.email));
    const existsQuerySnapshot = await getDocs(existsQuery);

    if (existsQuerySnapshot.empty) { // The user had a first time login(registration)
      await this.insertFirestoreUserFile(usersRef, userLogged);
    } else { // The user has already logged once (at least)
      existsQuerySnapshot.forEach(result => {
        this.updateUidFirestoreUserFile(result, userLogged.uid);
      });
    }
  }

  private updateUidFirestoreUserFile(result: any, userLoggedUid: String) {
    const uidCheckValue = result.get("uid");
    if (userLoggedUid !== uidCheckValue) {
      //update user UID in database
      const currentUserDocRef = doc(this.db, 'users', result.id);
      updateDoc(currentUserDocRef, {uid: userLoggedUid}).then(
        () => {
          console.log('UID updated');
        }
      );
    }
  }

  private async insertFirestoreUserFile(usersRef: any, userLogged: User) {
    try {
      const docRef = await addDoc(usersRef, {
        uid: userLogged.uid,
        email: userLogged.email,
        photoURL: userLogged.photoURL,
        displayName: userLogged.displayName
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
