#!/usr/bin/env node

//const express = require('express');
const server = require('express')();
const sharp = require('sharp');
const fs = require('fs');


const args = require('command-line-args')([
  {name: 'path', type: String, defaultOption: true, defaultValue: './public/images'},
  {name: 'port', alias: 'p', type: Number, defaultValue: 3000}
]);


const imageStream = (filename) => {
  return fs.createReadStream(`${args.path}/${filename}`);
}

server.get('/image/netlify/:image(*.(jpg|jpeg|png)$)', function (req, res) {
  console.log(`Netlify: ${req.params.image}`);

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
      .pipe(sharp().resize(options))
      .pipe(res);

  } else {
    imageStream(req.params.image)
      .pipe(res);
  }
});

server.get('/image/:image(*.(jpg|jpeg|png)$)', function (req, res) {
  console.log(`Default: ${req.params.image}`);

  let options = {
    fit: sharp.fit.cover,
    position: sharp.strategy.entropy
  };
  options.width = req.query.w ? parseInt(req.query.w) : null;
  options.height = req.query.h ? parseInt(req.query.h) : null;

  imageStream(req.params.image)
    .pipe(sharp().resize(options))
    .pipe(res);
});


server.listen(args.port, () => {
  console.log(`Image server listening on port ${args.port}`);
});
