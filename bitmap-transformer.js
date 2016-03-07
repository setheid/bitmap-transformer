'use strict';

const fs = require('fs');
var colorArray = [];

/*  Specify what image in the "original" folder to transform on the command line,
AFTER choosing what transformer to use.  */
if (process.argv[3]) {
  fs.readFile(__dirname + '/original/' + process.argv[3], transform);
} else {
  fs.readFile(__dirname + '/original/palette-bitmap.bmp', transform);
}

function transform(err, bitmap) {
  if (err) throw err;

  // Get Bitmap Meta Data
  let bitmapData = {};
  bitmapData.headerField = bitmap.toString('ascii', 0, 2);
  bitmapData.size = bitmap.readUInt32LE(2);
  bitmapData.pixelArrayStart = bitmap.readUInt32LE(10);
  bitmapData.colorDepth = bitmap.readUInt32LE(28);
  bitmapData.paletteColors = bitmap.readUInt32LE(46);
  console.dir(bitmapData);

  // Determin whether or not image has color palette
  if (bitmapData.paletteColors !== 0) {
    var buff = new Buffer(bitmap.slice(54, 54 + 128));
  } else {
    buff = new Buffer(bitmap.slice(54, bitmap.length-3));
  }

  buff.forEach(function(num) {
    colorArray.push(num);
  });


  // Choose which transformer to use in the command line; default to invert()
  if (process.argv[2] === 'tint') {
    var transformMethod = tint(colorArray);
  } else if (process.argv[2] === 'invert') {
    transformMethod = invert(colorArray);
  } else {
    transformMethod = invert(colorArray);
  }

  transformMethod.forEach(function(num, index) {
    bitmap.writeInt32LE(num, 54 + index);
  });

  fs.writeFile('./transformed/transformed_image.bmp', bitmap);
}

function tint(array) {
  var transformed = array.map(function(num) {
    return num + (255 - num) * 0.2;
  });
  return transformed;
}

function invert(array) {
  var transformed = array.map(function(num) {
    return 255 - num;
  });
  return transformed;
}

module.exports.transform = transform;
module.exports.tint = tint;
module.exports.invert = invert;
