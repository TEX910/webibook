import { Injectable } from '@angular/core';
import {addDoc, deleteDoc, collection, getDocs, getFirestore, query, where, updateDoc, doc, setDoc} from 'firebase/firestore'
import {BehaviorSubject, from, Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {BookElementModel} from "../models/bookElement.model";
import firebase from "firebase/compat";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookmarkTreeService {

  constructor(public authService: AuthService) { }

  storeBookmarkTree(bookMarkTree: BookElementModel[]) {
    let bookMarkObj = {};
    Object.assign(bookMarkObj, bookMarkTree);
    return from(setDoc(doc(this.authService.db, "bookmarks", "tree"), bookMarkObj));
    // note: delete non necessaria se il path è lo stesso
  }

  deleteExistingTree() {
    return deleteDoc(doc(this.authService.db, "bookmarks", "tree"));
  }
}
