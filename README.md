# TheQuinfallApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## The Quinfall Update Process

Requirements:  
    SQLiteTools: (sqlite-tools-win-x64-3490100): [SQLite Tools](https://sqlite.org/download.html)  
    SQLiteStudio: (SQLiteStudio-3.4.17): [SQLite Studio](https://sqlitestudio.pl/)  
    Python: (python-3.13.7-amd64): [Python](https://www.python.org/downloads/windows/)  
    Git: (Git-2.51.0-64-bit): [Git](https://git-scm.com/downloads)  
  
Step 1:  
In game (The Quinfall), use `/resource_export` in chat. This will download the files to `C:\Q_item_kaynak_db`, you can move these files to any location you wish.  
  
Step 2:  
Move the files from this project in the `\process-assets` folder to the same folder as the content of 'Q_item_kaynak_db'.  
  
Step 3:  
Use python to run the `process_quinfall_export.py` in the same directory, the code will look like `python process_quinfall_export.py`.  
    - This process will create the database file using sqlite, import the data, create my tables and views, then export the chuncked json files for upload.  
    - The chuncked json files will be in a new folder called `json`.  
  
Step 4:  
Move the contence of the `json` folder into the angular project `public\data\`. Override the old files, as they may have changed at some point.  
  
Step 5:  
In the angular project use `npm run deploy`. This will recreate the docs folder with the new files.  
  
Step 6:  
In the angular project use `git add .`. To add all the changed file from the project to the new commit.  
  
Step 7:  
In the angular project use `git commit -m "Commit Message"`. Create a new commit with a commit message, something like "Update data files".  
  
Step 8:  
In the angular project use `git push`. To send the changes to GitHub.  
  
Step 9:  
Wait for GitHub Pages to build the new version of the web page.  
  
Step 10:  
Verify that the webpage is working with the changes.  