import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NestedTreeControl} from "@angular/cdk/tree";
import {BookElementModel} from "../models/bookElement.model";
import {MatTreeNestedDataSource} from "@angular/material/tree";

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
    public authService: AuthService
  ) {
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: BookElementModel) => !!node.children && node.children.length > 0;

  onDrop(event: any) {
    event.preventDefault();
    const linkDragged = event.dataTransfer.getData('Text');
    console.log('Dragged link:' + linkDragged);
    this.TREE_DATA.push({id: '99', name: linkDragged, link: linkDragged, isFolder: false});
    this.dataSource.data = this.TREE_DATA;
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

}
