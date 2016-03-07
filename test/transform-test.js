'use strict';

const expect = require('chai').expect;
const bitmap = require(__dirname + '/../bitmap-transformer.js');
const tint = bitmap.tint;
const invert = bitmap.invert;

var testArray = [255, 255, 0, 0, 0, 255, 255, 0];

describe('test bitmap-transformer', function() {
  it('invert should take an array of numbers as an argument, '+
  'transform the array by subtracting every number from 255 to get its inverse color', function() {
    expect(invert(testArray)).to.eql([0, 0, 255, 255, 255, 0, 0, 255]);
  });

  it('tint should take an array of numbers as an argument and '+
  'transform the array by applying the formula, num + (255 - num) * 0.2, to every number.', function() {
    expect(tint(testArray)).to.eql([255, 255, 51, 51, 51, 255, 255, 51]);
  });
});
