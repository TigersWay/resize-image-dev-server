#!/usr/bin/env node

//const express = require('express');
const server = require('express')();
const sharp = require('sharp');
const fs = require('fs');


const args = require('command-line-args')([
  {name: 'path', type: String, defaultOption: true, defaultValue: './public/images'},
  {name: 'port', alias: 'p', type: Number, defaultValue: 3000}
]);


server.get('/image/:image(*)', function (req, res) {
  const imagePath = `${args.path}/${req.params.image}`;
  console.log(imagePath);

  const readableStream = fs.createReadStream(imagePath);

  options = {};
  options.width = req.query.w ? parseInt(req.query.w) : null;
  options.height = req.query.h ? parseInt(req.query.h) : null;

  const transformer = sharp().resize(options);

  readableStream.pipe(transformer).pipe(res);
});


server.listen(args.port, () => {
  console.log(`Image server listening on port ${args.port}`);
});
