# mickealm.se

### How to use

The template is built with Sass and Gulp build system with these features:

-	Handlebars HTML templates with Panini– Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials, external Handlebars helpers, or external data as JSON.
-	Sass compilation, prefixing with Autoprefixer, and JavaScript concatenation
-	Built-in BrowserSync server - Will automatically reload your page when files are changed. It also live-injects CSS changes when you save a Sass file. This task runs continuously. Defaults to localhost. 
-	For production builds - CSS compression, JavaScript compression, Image compression and more..


### Requirements

To use this template, your computer needs:

-	Node.js is used to run the build processes. https://nodejs.org/en/download/ 
-   Test: run ` node -v ` in the terminal
-	Npm (Node comes with npm installed so you should have a version of npm.) Used to manage development dependencies.
-   Test: run ` npm -v`  in the terminal
-	Gulp – task runner
	`npm install -g gulp`
-	Test: run `gulp -v ` in the terminal

### Original template

`git clone https://github.com/johndavemanuel/bootstrap-gulp-starter-template.git`


### Folder Structure:

- `dist/`: Compiled files. Note: Do not modify anything in this directory. Your changes will be overridden every time you run the build command. 
- `node_modules` Front-end dependencies.
- `src/` Folder contains all of your core, working files—static assets, pages, templates, etc. These assets are compiled to a distribution folder. This is a completely static HTML site. 
- `src/assets/` Sass files, JS files, images, and fonts go here.
- `src/data/` External data.
- `src/layouts/` HTML layouts (templates).
- `src/pages/` Site pages.
- `src/partials/` Handlebars partials.
- `reports` txt file for accessibility issues
- `gulpfile.js` Task definitions.
- `package.json` Handles the front-end dependencies.
- `.htmllintrc` Handles the HTML lint rules.
- `.sass-lint.yml` Handles the SASS lint rules.
