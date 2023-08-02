import { NgClass } from '@angular/common';
import { AfterViewInit, Component, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { IDialogData, NewEventDialogComponent } from './new-event-dialog/new-event-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // imports: [CdkDropList, CdkDrag],
})
export class AppComponent implements AfterContentInit {
  month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  title = 'calendar-event';
  createEvent = false
  calendarEvent: any = { 'Wed Jul 26 2023': 'Reminder for Birthday', 'Mon Jul 24 2023': 'Test preparation' }
  calendar: HTMLDivElement | null = null
  days: any[] = []
  month_list: HTMLDivElement | null = null
  month_picker: HTMLElement | null = null
  dark_mode_toggle: HTMLElement | null = null
  dragSrcEl: string | null = null

  constructor(private dialog: MatDialog) { }

  ngAfterContentInit() {
    this.dark_mode_toggle = document.querySelector('.dark-mode-switch')

    this.dark_mode_toggle!.onclick = () => {
      document.querySelector('body')!.classList.toggle('light')
      document.querySelector('body')!.classList.toggle('dark')
    }

    this.calendar = document.querySelector('.calendar')
    this.month_list = this.calendar!.querySelector('.month-list')
    this.month_names.forEach((e: string, index: number) => {
      let month = document.createElement('div')
      month.innerHTML = `<div data-month="${index}">${e}</div>`
      month.querySelector('div')!.onclick = () => {
        this.month_list!.classList.remove('show')
        curr_month.value = index
        this.generateCalendar(index, curr_year.value)
      }
      this.month_list!.appendChild(month)
    })

    this.month_picker = this.calendar!.querySelector('#month-picker')

    this.month_picker!.onclick = () => {
      this.month_list!.classList.add('show')
    }

    let currDate = new Date()

    let curr_month = { value: currDate.getMonth() }
    let curr_year = { value: currDate.getFullYear() }

    this.generateCalendar(curr_month.value, curr_year.value);

    (document.querySelector('#prev-year') as HTMLElement)!.onclick = () => {
      --curr_year.value
      this.generateCalendar(curr_month.value, curr_year.value)
    }

    (document.querySelector('#next-year') as HTMLElement)!.onclick = () => {
      ++curr_year.value
      this.generateCalendar(curr_month.value, curr_year.value)
    }
  }

  // handle events from dilaog
  eventDatas(data: IDialogData) {
    switch (data.type) {
      case 'delete':
        delete this.calendarEvent[data?.date?.toDateString()!]
        break
      case 'update':
        delete this.calendarEvent[data?.prevDate as string]
        this.eventDatas({ ...data, type: 'new' })
        break
      case 'new':
        this.calendarEvent[data?.date?.toDateString()!] = data.text

        break
    }
    let currDate = new Date(data.date!)

    let curr_month = { value: currDate.getMonth() }
    let curr_year = { value: currDate.getFullYear() }


    this.generateCalendar(curr_month.value, curr_year.value);
  }

  isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
  }

  getFebDays = (year: number) => {
    return this.isLeapYear(year) ? 29 : 28
  }

  generateCalendar = (month: number, year: number) => {

    let calendar_header_year = this.calendar!.querySelector('#year')

    let days_of_month = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${this.month_names[month]}`
    this.month_picker!.innerHTML = curr_month
    calendar_header_year!.innerHTML = year.toString()


    let first_day = new Date(year, month, 1)
    let dayArray = []
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let dayObj = {}

      if (i >= first_day.getDay()) {
        dayArray.push({ value: `${i - first_day.getDay() + 1}`, date: new Date(year, month, i - first_day.getDay() + 1).toDateString() })

      }
      else {
        dayArray.push({ value: '', date: '' })

      }
    }
    this.days = [...dayArray]
  }


  openPopup(inpData: any = null, type = 'new'): void {
    let data = {}
    if (inpData || type) {
      data = { date: inpData, text: this.calendarEvent[inpData], type }
    }
    const dialogRef = this.dialog.open(NewEventDialogComponent, { disableClose: true, data });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.eventDatas(result)
    });
  }

  handleDragStart(e: any) {
    e.target.style.opacity = '0.4';

    this.dragSrcEl = e.currentTarget.id;
  }

  handleDragOver(e: any) {
    e.preventDefault();

    return false;
  }

  handleDragEnter(e: any) {
    e.target.classList.add('over');
  }

  handleDragLeave(e: any) {
    e.target.classList.remove('over');
  }

  handleDrop(e: any) {
    e.stopPropagation();

    if (this.dragSrcEl !== e.currentTarget.id) {
      this.eventDatas({ type: 'update', prevDate: this.dragSrcEl!, date: new Date(e.currentTarget.id), text: this.calendarEvent[(this.dragSrcEl as any)] })

    }

    return false;
  }


  handleDragEnd(e: any) {
    e.target.style.opacity = '1';
  }








}
