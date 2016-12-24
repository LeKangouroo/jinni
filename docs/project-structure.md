[Documentation]: index.md
[Home]: ../README.md

[Home] > [Documentation] > Project Structure

# Project Structure
.
├── README.md
├── boilerplate
│   ├── _common
│   │   ├── README.md
│   │   ├── config
│   │   │   ├── common
│   │   │   │   ├── paths.json
│   │   │   │   ├── replacements.js
│   │   │   │   └── versioning.json
│   │   │   ├── config.js
│   │   │   ├── nodeModules
│   │   │   │   ├── auto-prefixer.json
│   │   │   │   ├── browser-sync.json
│   │   │   │   ├── imagemin
│   │   │   │   │   ├── jpeg-recompress.json
│   │   │   │   │   └── pngquant.json
│   │   │   │   ├── jasmine.js
│   │   │   │   ├── jshint.json
│   │   │   │   ├── json-server.json
│   │   │   │   ├── pug.json
│   │   │   │   ├── sass.json
│   │   │   │   ├── svg-sprite.json
│   │   │   │   └── webpack.js
│   │   │   └── tasks
│   │   │       ├── clean.json
│   │   │       ├── email.json.example
│   │   │       └── ftp.json.example
│   │   ├── gitignore
│   │   ├── npmrc
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   │       └── icons
│   │   │   │           └── svg
│   │   │   │               └── empty
│   │   │   ├── html
│   │   │   │   └── _pug
│   │   │   │       └── includes
│   │   │   │           └── common
│   │   │   │               └── metas.pug
│   │   │   ├── js
│   │   │   │   ├── core
│   │   │   │   │   └── polyfills.js
│   │   │   │   └── modules
│   │   │   │       ├── analytics
│   │   │   │       │   └── google.js
│   │   │   │       ├── core
│   │   │   │       │   ├── browser.js
│   │   │   │       │   ├── custom-exception.js
│   │   │   │       │   ├── events.js
│   │   │   │       │   ├── request-exception.js
│   │   │   │       │   ├── request.js
│   │   │   │       │   ├── router-exception.js
│   │   │   │       │   └── router.js
│   │   │   │       └── ui
│   │   │   │           ├── form-validator.js
│   │   │   │           └── form.js
│   │   │   ├── sass
│   │   │   │   ├── base
│   │   │   │   │   ├── _fonts.scss
│   │   │   │   │   ├── _html.scss
│   │   │   │   │   ├── _keyframes.scss
│   │   │   │   │   ├── _media-queries.scss
│   │   │   │   │   └── base.scss
│   │   │   │   ├── mixins
│   │   │   │   │   ├── _cover.scss
│   │   │   │   │   ├── _reset-button.scss
│   │   │   │   │   └── mixins.scss
│   │   │   │   ├── ui
│   │   │   │   │   ├── _checkbox.scss
│   │   │   │   │   ├── _radio.scss
│   │   │   │   │   ├── _select.scss
│   │   │   │   │   ├── _switch.scss
│   │   │   │   │   ├── _textarea.scss
│   │   │   │   │   ├── _textfield.scss
│   │   │   │   │   └── ui.scss
│   │   │   │   ├── variables
│   │   │   │   │   ├── _colors.scss
│   │   │   │   │   ├── _environment.scss
│   │   │   │   │   └── variables.scss
│   │   │   │   └── vendors
│   │   │   │       ├── _bourbon.scss
│   │   │   │       ├── _neat.scss
│   │   │   │       ├── _normalize.scss
│   │   │   │       └── vendors.scss
│   │   │   └── vendors
│   │   │       └── README.md
│   │   ├── taskrunner
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   │       └── notifications
│   │   │   │           ├── html.png
│   │   │   │           ├── jade.png
│   │   │   │           ├── javascript.png
│   │   │   │           ├── sass.png
│   │   │   │           └── svg.png
│   │   │   ├── gulpfile.babel.js
│   │   │   ├── modules
│   │   │   │   ├── argv.js
│   │   │   │   ├── git.js
│   │   │   │   ├── logger.js
│   │   │   │   ├── notifications.js
│   │   │   │   ├── paths.js
│   │   │   │   └── tasks.js
│   │   │   ├── tasks
│   │   │   │   ├── api.js
│   │   │   │   ├── build.js
│   │   │   │   ├── changelog.js
│   │   │   │   ├── clean.js
│   │   │   │   ├── dev.js
│   │   │   │   ├── email.js
│   │   │   │   ├── ftp.js
│   │   │   │   ├── html.js
│   │   │   │   ├── images.js
│   │   │   │   ├── instrumented-tests.js
│   │   │   │   ├── javascript.js
│   │   │   │   ├── livereload.js
│   │   │   │   ├── pug.js
│   │   │   │   ├── sass.js
│   │   │   │   ├── static.js
│   │   │   │   ├── svg.js
│   │   │   │   ├── todos.js
│   │   │   │   ├── unit-tests.js
│   │   │   │   └── zip.js
│   │   │   ├── templates
│   │   │   │   ├── changelog
│   │   │   │   │   ├── html.txt
│   │   │   │   │   └── markdown.txt
│   │   │   │   └── email.html
│   │   │   └── usage
│   │   │       ├── commands
│   │   │       │   ├── api.js
│   │   │       │   ├── build.js
│   │   │       │   ├── changelog.js
│   │   │       │   ├── clean.js
│   │   │       │   ├── dev.js
│   │   │       │   ├── email.js
│   │   │       │   ├── ftp.js
│   │   │       │   └── todos.js
│   │   │       ├── options
│   │   │       │   ├── env.js
│   │   │       │   └── mode.js
│   │   │       └── usage.js
│   │   └── tests
│   │       ├── instrumented-tests
│   │       │   └── specs
│   │       │       └── hello-world.js
│   │       └── unit-tests
│   │           └── specs
│   │               └── hello-world.js
│   ├── classic
│   │   └── src
│   │       ├── html
│   │       │   ├── _pug
│   │       │   │   └── layouts
│   │       │   │       └── default.pug
│   │       │   └── index.pug
│   │       ├── js
│   │       │   └── main.js
│   │       └── sass
│   │           ├── base
│   │           │   └── _layout.scss
│   │           ├── components
│   │           │   └── components.scss
│   │           └── main.scss
│   └── spa
│       └── src
│           ├── html
│           │   ├── _pug
│           │   │   └── layouts
│           │   │       └── default.pug
│           │   └── index.pug
│           ├── js
│           │   ├── core
│           │   │   └── router.js
│           │   └── main.js
│           ├── sass
│           │   ├── base
│           │   │   └── _layout.scss
│           │   ├── main.scss
│           │   └── vuejs
│           │       ├── _sections.scss
│           │       └── vuejs.scss
│           └── vuejs
│               └── sections
│                   └── home
│                       ├── home.scss
│                       └── home.vue
├── docs
│   ├── _config.yml
│   ├── features.md
│   ├── getting-started.md
│   ├── index.md
│   └── project-structure.md
├── package.json
└── src
    ├── assets
    │   └── text
    │       └── ascii.txt
    ├── bin
    │   └── cli.js
    ├── modules
    │   └── logger.js
    ├── scripts
    │   └── init.js
    └── usages
        └── default.js

75 directories, 133 files
