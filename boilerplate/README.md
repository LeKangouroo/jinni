# Dependencies

* [NodeJS](https://nodejs.org) (v6.7.x LTS)

# Installation

```
npm install
```

# Available commands

To start development mode:

```
npm run dev
```

To build the distributable version:

```
npm run build:preprod
npm run build:prod
```

To deploy dist on an FTP server (after npm run build)
duplicate config/tasks/ftp.json.example and remove .example extension then:

```
npm run deploy
```

To remove build files

```
npm run clean # removes tmp/ directory
npm run fclean # removes tmp/ and dist/ directories
```

To create a tarball (.tar.gz) of the dist/ directory

```
npm run zip
```
To get Git changelog

```
npm run chlg -- --start=<commit-id>
```

To generate todo based on comments in the code

```
npm run todos # creates a TODO.md file in tmp/ directory
```
