#!/usr/bin/env node

const server = require('express')();
const sharp = require('sharp');
const chalk = require('chalk');
const fs = require('fs');


const args = require('command-line-args')([
  {name: 'path', type: String, defaultOption: true, defaultValue: './public'},
  {name: 'port', alias: 'p', type: Number, defaultValue: 3000},
  {name: 'quiet', alias: 'q', type: Boolean}
]);


const imageStream = (filename) => {
  return fs.createReadStream(`${args.path}/${filename}`);
}

server.get('/image/netlify/:image(*.(jpg|jpeg|png)$)', function (req, res, next) {
  let valid = true;
  let options = {};
  switch (req.query.nf_resize) {
    case 'fit':
      options.fit = sharp.fit.inside;
      break;
    case 'smartcrop':
      options.fit = sharp.fit.cover;
      options.position = sharp.strategy.entropy;
      break;
    default:
      valid = false;    // 'nf_resize' is required
  }
  options.width = req.query.w ? parseInt(req.query.w) : null;
  options.height = req.query.h ? parseInt(req.query.h) : null;

  if (valid) {
    imageStream(req.params.image)
      .on('error', (e) => {
        console.error(chalk.red(e.message));
        next();
      })
      .pipe(sharp().resize(options))
      .on('end', () => {
        if (!args.quiet) console.log(`Netlify: ${req.params.image}`);
      })
      .pipe(res);
  } else {
    imageStream(req.params.image)
      .on('error', (e) => {
        console.error(chalk.red(e.message));
        next();
      })
      .on('end', () => {
        console.log(chalk.cyan(`None: ${req.params.image}`));
      })
      .pipe(res);
  }
});

server.get('/image/:image(*.(jpg|jpeg|png)$)', function (req, res, next) {
  let options = {
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  };
  options.width = req.query.w ? parseInt(req.query.w) : null;
  options.height = req.query.h ? parseInt(req.query.h) : null;

  imageStream(req.params.image)
    .on('error', (e) => {
      console.error(chalk.red(e.message));
      next();
    })
    .pipe(sharp().resize(options))
    .on('end', () => {
      if (!args.quiet) console.log(`Classic: ${req.params.image}`);
    })
    .pipe(res);
});


server.listen(args.port, () => {
  console.log(chalk.yellow('Starting up Image server, serving ') + chalk.cyan(args.path) + chalk.yellow(' on ') + chalk.cyan(args.port));
});
