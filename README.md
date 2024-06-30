# RbacApp
This application will have a login page and has  two users 

1. Username: admin
Password: password1 (role: Admin)

2. Username: staff
Password: password2 (role: Staff)

Functionality:

Admin can perform all CRUD operations and navigate to all other routes (protected 1 and protected 2)
AssumeRole for each User.

Staff can only view the UserList and view the other two routes(protected 1 and protected 2)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
