import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


const config = {
  apiKey: "AIzaSyDQejVt0uPATnMFWFb6CKnD75WvPdGvhLk",
  authDomain: "webibook-webiapp.firebaseapp.com",
  projectId: "webibook-webiapp",
  storageBucket: "webibook-webiapp.appspot.com",
  messagingSenderId: "1093825676681",
  appId: "1:1093825676681:web:d5598e702534f35fb00d58",
  measurementId: "G-PMG64Y9DKG"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
