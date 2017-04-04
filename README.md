# NextGenVest Front End Challenge

_Visualizing four different types of student loans_

## Installing dependencies

```sh
npm install
```

This will install all runtime dependencies, as well as Webpack build and Angular (1).

### Running the app

There are two ways to run the app in development mode:

```sh
npm start
```

This will simultaneously bundle webpack and watch the server for any changes (for auto rebuild).


```sh
npm run build-css
```

This will build/compile the CSS based on the SCSS file changes. This will also continuously watch for changes and auto-rebuild.


## Reading the Chart

As you hover your mouse over the chart, as you go from left to right (through each of the months), a popup of all the different types of loans will appear. At that point in time, it will indicate how much is left to the loan amount after each successive monthly payment.

## Chart Legend
The legend indicates the different loan calculations and their monthly payments.

## Credit

I relied on helpful Angular tutorials (as this is the first time I've learned/used Angular 1 to date) to work through the creation of this code challenge.

Credit to the following resources:
- angular-webpack-starter
- ZingChart-AngularJS [https://github.com/zingchart/ZingChart-AngularJS]
- Phonecat [https://github.com/angular/angular-phonecat]


### Future Improvements

I would like to create more modularized code, definitely implement templates (templateUrl) and the like in future Angular apps. I would prefer not to inundate the main index.html file with so much HTML.


