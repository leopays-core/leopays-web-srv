#!/usr/bin/env node
// make-hbs-layout.js
const fs = require('fs');
const argv = require('yargs').argv
const parse5 = require('parse5');


const inputFile = argv.inputFile;
const outputFile = argv.outputFile;

if (!fs.existsSync(inputFile)) {
  console.error(`input-file '${inputFile}' is not exists.`);
  process.exit(1);
}

const html = fs.readFileSync(inputFile, { encoding: 'utf8' });

const document = parse5.parse(html);
// Pointers to html, head, body
const nodeHTML = document.childNodes[1]; // <html lang="en">
const nodeHEAD = document.childNodes[1].childNodes[0]; // pointer to <head></head>
const nodeBODY = document.childNodes[1].childNodes[1]; // pointer to <body></body>

//attrs: [ { name: 'lang', value: 'en' } ],
if (nodeHTML.attrs[0].name = 'lang')
  nodeHTML.attrs[0].value = '{{lang}}';

for (i in nodeHEAD.childNodes) {
  const n = nodeHEAD.childNodes[i];

  if (n.nodeName === 'meta') {
    //<meta name="description" content="Description text" />
    if (n.attrs[0].name === 'name' && n.attrs[0].value === 'description')
      if (n.attrs[1].name === 'content')
        n.attrs[1].value = '{{description}}';
  }

  //<title>TITLE</title>
  if (n.nodeName === 'title') {
    if (n.childNodes[0].nodeName === '#text')
      n.childNodes[0].value = '{{title}}';
  }
}
nodeBODY.childNodes.unshift()

for (i in nodeBODY.childNodes) {
  const n = nodeBODY.childNodes[i];

  //<noscript>You need to enable JavaScript to run this app.</noscript>
  /*
  if (n.nodeName === 'noscript')
    if (n.childNodes[0].nodeName === '#text')
      n.childNodes[0].value = '{{noscript}}';
  */
}

// Serializes a document.
let data = parse5.serialize(document);
// Insert mount place for hbs
//data = data.replace('<div class="hidden"></div>', '<div class="hidden">\n{{{body}}}\n</div>');

// rewrite layout
if (fs.existsSync(outputFile))
  fs.renameSync(outputFile, `${outputFile}.${new Date().getTime()}.ignoreforgit`);
fs.writeFileSync(outputFile, data);

process.exit(0);

/*
  - <html lang="{{lang}}">;
  - <title>{{title}}</title>;
  - <meta name="description" content="{{description}}" />;
  - <noscript>{{noscript}}</noscript>;
  - Inserted mount place for hbs - '</head><body>{{{body}}}'.
*/
