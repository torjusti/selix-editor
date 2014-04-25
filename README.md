Selix Editor
============

A sample editor that utilizes `selix` for handling inserting `BBCode` in a standard text input. This editor is not intended for being easy to plug into an existing configuration. It attempts to provide a reference implementation for a text editor using my `selix` library. Also includes ghetto implementations of a modal and a color picker.

Directory structure
-------------------

- `bourbon` contains the Sass library of the same name that has been installed using `bourbon install`
- `dist` contains finished and minimized files for the whole project built using `gulp`
- `scripts` contains the JavaScript code for this project
- `styles` contains the Sass style files for this project
- The root directory contains `gulp` configuration files, `package.json` and the main editor HTML file.

Building
--------

You might want to start off by running `bourbon update` if anything has changed on that end. To build the project, run `npm install` and then `gulp` or `gulp watch` if you want to modify files.