/* eslint-env worker */
/* global manipulate */

importScripts('./imageManips.js');

this.onmessage = function(evnt) {
  // console.dir(evnt);

  var imageData = evnt.data.imageData;
  var type = evnt.data.type;
  var length, i, j, ref;
  var r, g, b, a;
  var pixel;


  try {
    length = imageData.data.length / 4;

    for (i = j = 0, ref = length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      r = imageData.data[i * 4 + 0];
      g = imageData.data[i * 4 + 1];
      b = imageData.data[i * 4 + 2];
      a = imageData.data[i * 4 + 3];

      pixel = manipulate(type, r, g, b, a);

      imageData.data[i * 4 + 0] = pixel[0];
      imageData.data[i * 4 + 1] = pixel[1];
      imageData.data[i * 4 + 2] = pixel[2];
      imageData.data[i * 4 + 3] = pixel[3];
    }

    postMessage(imageData);
  } catch (ev) {
    throw new ManipulationException('Image manipulation error');
    // postMessage(undefined);
  }

  function ManipulationException(message) {
    this.name = "ManipulationException";
    this.message = message;
  }
};
