import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-link-position-setter',
  templateUrl: './link-position-setter.component.html',
  styleUrls: ['./link-position-setter.component.css']
})
export class LinkPositionSetterComponent implements OnInit {

  position: string = "";

  constructor(
    public dialogRef: MatDialogRef<LinkPositionSetterComponent>,
    @Inject(MAT_DIALOG_DATA) public linkText: String,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveLink() : void {
    this.dialogRef.close(this.position);
  }

}
