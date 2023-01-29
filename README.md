# MsalAngularTutorial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.2.
This is based on `msal-angular` library official tutorial for [Angular Single Page Application or SLA](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code)

The goal of this demo is to Sign in users and call the Microsoft Graph API from an Angular single-page application (SPA) using auth code flow; as stated in the official documentation.

## Libraries used

| MSAL Angular 	| Microsoft Authentication Library for JavaScript Angular Wrapper    	|
|--------------	|--------------------------------------------------------------------	|
| MSAL Browser 	| Microsoft Authentication Library for JavaScript v2 browser package 	|

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

`npm install -g @angular/cli                         # Install the Angular CLI`
`ng new msal-angular-tutorial --routing=true --style=css --strict=false    # Generate a new Angular app`
`cd msal-angular-tutorial                            # Change to the app directory`
`npm install @angular/material @angular/cdk          # Install the Angular Material component library (optional, for UI)`
`npm install @azure/msal-browser @azure/msal-angular # Install MSAL Browser and MSAL Angular in your application`
`ng generate component home                          # To add a home page`
`ng generate component profile                       # To add a profile page`
`
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
