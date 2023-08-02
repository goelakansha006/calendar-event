import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.scss']
})
export class NewEventDialogComponent implements OnInit {
  date: Date | null = null;
  prevDate: any = null;
  text: string | undefined = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData, public dialogRef: MatDialogRef<NewEventDialogComponent>,
  ) {

  }

  ngOnInit(): void {
    if (this.data.type == 'update') {
      this.prevDate = this.data?.date
      this.text = this.data?.text
      this.date = new Date(this.data?.date!)
    }

  }

  closeDialog(type: any) {
    let data: IDialogData = {
      date: this.date,
      text: this.text!,
      prevDate: this.prevDate,
      type: type ? type : this.data.type
    }
    // Send data to the parent component
    this.dialogRef.close(data);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}

export interface IDialogData {
  type: 'new' | 'update' | 'delete',
  date: Date | null,
  prevDate: Date | string,
  text: string
}
