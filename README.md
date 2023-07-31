# CalendarEvent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Features:

Add Events on the Calendar:

To add a new event, the user needs to click on the "New" button on the calendar.
A popup will open, allowing the user to enter the event detail and date of the event.
After entering the required information, the user can click on the "Save" button to create the event.


Edit Events:

To edit an existing event, the user can click on the event on the calendar.
An options menu (e.g., Delete/Edit) will appear, and the user can select "Edit" from the options.
An edit event dialog will open, displaying the current details of the event.
The user can update the title and date of the event and then click on the "Save" button to save the changes.


Delete Events:

To delete an existing event, the user can click on the event on the calendar.
An options menu (e.g., Delete/Edit) will appear, and the user can click on bin icon.


Change Date of the Event:

Users can change the date of an event by performing a drag and drop operation.
They need to click and hold the event on the calendar and then drag it to the desired date.
Upon dropping the event on the new date, the event will be updated with the new date.


Change Month by Navigation on the Top Bar:

The top bar of the calendar contains navigation controls to switch between months by clicking on month.
Users can click on the previous or next arrows to navigate to the previous or next year, respectively.
The calendar will automatically update to display the events for the selected month.

Theme Provided

Dark and Light theme added
