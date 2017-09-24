[Github Pages]: https://pages.github.com
[Home]: index.md
[Jekyll]: http://jekyllrb.com
[Markdown]: https://en.wikipedia.org/wiki/Markdown
[React]: https://facebook.github.io/react

[Home] > Project Structure

# Project Structure

## Preview

```
.
├── boilerplate
│   ├── _common
│   │   ├── src
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   │       ├── icons
│   │   │   │       │   └── svg
│   │   │   │       └── metadata
│   │   │   ├── html
│   │   │   │   └── _includes
│   │   │   │       └── common
│   │   │   ├── js
│   │   │   │   ├── classes
│   │   │   │   ├── core
│   │   │   │   └── modules
│   │   │   │       ├── analytics
│   │   │   │       ├── device
│   │   │   │       ├── network
│   │   │   │       └── ui
│   │   │   ├── sass
│   │   │   │   ├── base
│   │   │   │   ├── mixins
│   │   │   │   ├── variables
│   │   │   │   └── vendors
│   │   │   └── vendors
│   │   ├── taskrunner
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   │       └── notifications
│   │   │   ├── config
│   │   │   │   ├── common
│   │   │   │   ├── nodeModules
│   │   │   │   │   └── imagemin
│   │   │   │   └── tasks
│   │   │   ├── modules
│   │   │   ├── tasks
│   │   │   ├── templates
│   │   │   └── usage
│   │   │       ├── commands
│   │   │       └── options
│   │   └── tests
│   │       ├── instrumented-tests
│   │       │   └── specs
│   │       └── unit-tests
│   │           └── specs
│   ├── classic
│   │   └── src
│   │       ├── html
│   │       ├── js
│   │       └── sass
│   │           └── components
│   └── spa
│       └── src
│           ├── components
│           │   └── example-component
│           ├── html
│           ├── js
│           │   └── core
│           ├── sass
│           └── sections
│               └── home
├── docs
├── src
│   ├── assets
│   │   └── text
│   ├── bin
│   ├── modules
│   ├── scripts
│   └── usages
│       └── options
└── tests
    └── boilerplate
        └── modules
            ├── device
            ├── network
            └── ui
```

## Details

### boilerplate/

The `boilerplate/` directory includes the complete codebase for your projects. It has 3 subdirectories :

1. `boilerplate/_common/` contains files that are not specific to a type of boilerplate.
2. `boilerplate/classic` contains files for classic websites only.
3. `boilerplate/spa` contains files for Single Page Applications only. [React] is the selected framework.

### docs/

The `docs/` directory includes the documentation that you are reading. It's written using [Markdown] syntax and can be published with some awesome tools such as [Github Pages] or [Jekyll].

### src/

The `src/` directory contains the generator's source code. Basically, everything related to the `jin` command is there.

### tests/

The `tests/` directory contains the unit tests.
