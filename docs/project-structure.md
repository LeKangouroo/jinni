[Github Pages]: https://pages.github.com
[Home]: index.md
[Jekyll]: http://jekyllrb.com
[Markdown]: https://en.wikipedia.org/wiki/Markdown
[Vue.js]: http://vuejs.org

[Home] > Project Structure

# Project Structure

## Preview

```
.
├── boilerplate
│   ├── _common
│   │   ├── config
│   │   │   ├── common
│   │   │   ├── nodeModules
│   │   │   └── tasks
│   │   ├── src
│   │   │   ├── assets
│   │   │   │   └── images
│   │   │   │       └── icons
│   │   │   │           └── svg
│   │   │   ├── html
│   │   │   │   └── _pug
│   │   │   ├── js
│   │   │   │   ├── core
│   │   │   │   └── modules
│   │   │   │       ├── analytics
│   │   │   │       ├── core
│   │   │   │       └── ui
│   │   │   ├── sass
│   │   │   │   ├── base
│   │   │   │   ├── mixins
│   │   │   │   ├── ui
│   │   │   │   ├── variables
│   │   │   │   └── vendors
│   │   │   └── vendors
│   │   ├── taskrunner
│   │   │   ├── assets
│   │   │   ├── modules
│   │   │   ├── tasks
│   │   │   ├── templates
│   │   │   └── usage
│   │   │       ├── commands
│   │   │       └── options
│   │   └── tests
│   │       ├── instrumented-tests
│   │       └── unit-tests
│   ├── classic
│   │   └── src
│   │       ├── html
│   │       ├── js
│   │       └── sass
│   └── spa
│       └── src
│           ├── html
│           ├── js
│           ├── sass
│           └── vuejs
│               └── sections
├── docs
└── src
    ├── assets
    ├── bin
    ├── modules
    ├── scripts
    └── usages
```

## Details

### boilerplate/

The `boilerplate/` directory includes the complete codebase for your projects. It has 3 subdirectory :

1. `boilerplate/_common/` contains files that are not specific to a type of boilerplate.
2. `boilerplate/classic` contains files for classic websites only.
3. `boilerplate/spa` contains files for Single Page Applications only. [Vue.js] is the selected framework, but can be easily replaced.

### docs/

The `docs/` directory includes the documentation that you are reading. It's written using [Markdown] syntax and can be published with some awesome tools such as [Github Pages] or [Jekyll].

### src/

The `src/` directory contains the generator's source code. Basically, everything related to the `jin` command is there.
