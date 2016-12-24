[Documentation]: index.md
[Home]: ../README.md

[Home] > [Documentation] > Features

# Features

Features have been developed around [Gulp](http://gulpjs.com),
a task runner which offers flexibility and modularity.

All tasks are available in the `boilerplate/taskrunner/tasks/` directory,
and some of them are encapsulated using [npm scripts](https://docs.npmjs.com/misc/scripts)
in order to provide a more generic API.

<br>

Here is the full list of available tasks :

| name               | description                                                      | npm script |
|--------------------|------------------------------------------------------------------|------------|
| api                | runs a fake REST API locally                                     | yes        |
| build              | generates the distributable code                                 | yes        |
| changelog          | outputs changes history from a certain git commit hash           | yes        |
| clean              | removes build files from the project directory                   | yes        |
| dev                | runs the development environment                                 | yes        |
| email              | sends an email based on an email template                        | yes        |
| ftp                | deploys the distributable code on an FTP server                  | yes        |
| html               | processes HTML files                                             | no         |
| images             | processes image files (i.e. optimization)                        | no         |
| instrumented-tests | runs instrumented tests (browser interactions)                   | yes        |
| javascript         | processes JavaScript files (transpiling, modules bundling, etc.) | yes        |
| livereload         | starts a [BrowserSync](https://www.browsersync.io) server        | no         |
| pug                | processes [Pug](https://github.com/pugjs/pug) files              | no         |
| sass               | processes [Sass](http://sass-lang.com) files                     | no         |
| static             | copies static files into the distributable code's directory      | no         |
| svg                | generates a sprite from SVG icons                                | no         |
| todos              | generates a TODO.md file listing all //TODO comments             | yes        |
| unit-tests         | runs unit tests and outputs the results in the terminal          | yes        |
| zip                | creates an archive file of the distributable code                | yes        |
