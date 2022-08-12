import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NestedTreeControl} from "@angular/cdk/tree";
import {BookElementModel} from "../models/bookElement.model";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LinkPositionSetterComponent} from "./link-position-setter/link-position-setter.component";
import {BookmarkTreeService} from "./bookmark-tree.service";

@Component({
  selector: 'app-bookmark-tree',
  templateUrl: './bookmark-tree.component.html',
  styleUrls: ['./bookmark-tree.component.css']
})
export class BookmarkTreeComponent implements OnInit {

  treeController = new NestedTreeControl<BookElementModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<BookElementModel>();
  TREE_DATA: BookElementModel[] = [
    {
      id: '1',
      name: 'preferito 1',
      link: "https://firebase.google.com/docs/reference/js/firestore_lite.md#updatedoc",
      isFolder: false
    },
    {
      id: '2',
      name: 'preferito 2',
      isFolder: false
    },
    {
      id: '3',
      name: 'cartella A',
      isFolder: true,
      children: [
        {
          id: '4',
          name: 'preferito A.1',
          isFolder: false
        },
        {
          id: '5',
          name: 'preferito A.2',
          isFolder: false
        }
      ]
    }
  ];

  constructor(
    public authService: AuthService,
    public bookmarkTreeService: BookmarkTreeService,
    public matDialogLinkPosition: MatDialog
  ) {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: BookElementModel) => !!node.children && node.children.length > 0;

  onDrop(event: any) {
    event.preventDefault();
    const linkDragged = event.dataTransfer.getData('Text');
    const dialogLinkPositionRef = this.matDialogLinkPosition.open(LinkPositionSetterComponent, {
      data: {
        linkDragged
      },
      width: '250px'
    });
    // TODO: this row below is the equivalent of saving to firestore - needed await this.linkStorageService.addNewLink()
    this.whenPathChosenSaveInTree(dialogLinkPositionRef, linkDragged);
  }

  private whenPathChosenSaveInTree(dialogLinkPositionRef: MatDialogRef<LinkPositionSetterComponent, any>, linkDragged: string) {
    dialogLinkPositionRef.afterClosed().subscribe(pathWhereToSave => {
      const stringPath: string = pathWhereToSave;
      this.allocateLinkInCorrectPath(pathWhereToSave, linkDragged);
      this.updateTree();
      this.bookmarkTreeService.storeBookmarkTree(this.dataSource.data).subscribe(response => {
        console.log(response);
      });
    });
  }

  private updateTree() {
    // @ts-ignore
    this.dataSource.data = null; // necessario, bug di mat-tree
    this.dataSource.data = this.TREE_DATA;
  }

  private allocateLinkInCorrectPath(path: String, link: String) {
    const splitPath = path.split("/");
    if (splitPath.length <= 1) {
      this.TREE_DATA.push({id: '99', name: link, link: link, isFolder: false});
      return;
    }
    let currentFolder = this.TREE_DATA;
    let counterStep = 0;
    for(const step of splitPath) {
      counterStep++;
      currentFolder = this.TREE_DATA.filter((e) => { return e.name === step });
      if(currentFolder.length > 0) {
        if (currentFolder[0].children && counterStep === splitPath.length) {
          currentFolder[0].children.push({id: '99', name: link, link: link, isFolder: false});
          return;
        }
      } else {
        this.TREE_DATA.push({id: '99', name: step, isFolder: true});
        return;
      }
    }
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

}
