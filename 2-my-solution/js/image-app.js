//
// 'iA' is short for imageApp, or **Image App**
//
window.iA = {};


// This alias shortens the code, keeps linters happy, and breaks nothing:
var iA = window.iA;

iA.inputElement = document.getElementById('imageLoader');

iA.canvas = document.getElementById('image');

iA.webWorker = new Worker('./js/worker.js');

iA.ctx = iA.canvas.getContext('2d');

// This will be assigned later:
iA.originalInputImage = undefined;

iA.inputImageChangeHandler = function(evnt) {
  var reader = new FileReader();

  reader.onload = function(evnt2) {
    var img = new Image();

    img.onload = function() {
      iA.canvas.width = img.width;
      iA.canvas.height = img.height;
      iA.ctx.drawImage(img, 0, 0);
      iA.originalInputImage = iA.ctx.getImageData(0, 0, img.width, img.height);
    };

    // Inspecting these values can help you
    // learn more about how this code works:

    // console.dir(evnt2);
    // console.dir(evnt);

    // Want to learn more about Event objects?
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event

    // Want to learn more about the FileReader API?
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader

    img.src = evnt2.target.result;
  };

  if (evnt.target.files.length !== 0) {
    reader.readAsDataURL(evnt.target.files[0]);
  }
};

iA.toggleButtonsAbledness = function() {
  var buttons = document.getElementsByTagName('button');

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].hasAttribute('disabled')) {
      buttons[i].removeAttribute('disabled');
    } else {
      buttons[i].setAttribute('disabled', null);
    }
  }
};

iA.manipulateImage = function(type) {
  var imageData;

  if (!iA.originalInputImage) {
    return;
  }

  imageData = iA.ctx.getImageData(0, 0, iA.canvas.width, iA.canvas.height);

  iA.toggleButtonsAbledness();

  iA.webWorker.postMessage(
    {'imageData': imageData, 'type': type}
  );

  iA.webWorker.onmessage = function(evnt) {
    var image = evnt.data;

    iA.toggleButtonsAbledness();

    if (image) {
      return iA.ctx.putImageData(evnt.data, 0, 0);
    } else {
      console.log("No manipulated image returned.");
    }
  };

  iA.webWorker.onerror = function() {
    function WorkerException(message) {
      this.name = "WorkerException";
      this.message = message;
    }

    throw new WorkerException('Worker error.');
  };
};

iA.revertImage = function() {
  if (iA.originalInputImage) {
    iA.ctx.putImageData(iA.originalInputImage, 0, 0);
  }
};

iA.buildClickHandlers = function() {
  var revertButton = document.getElementById('revert');
  var allButtons = document.getElementsByTagName('button');

  var allButtonsAsArray = Array.prototype.slice.call(allButtons);
  // http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript/9329476#9329476
  // may fail in IE8?

  allButtonsAsArray.forEach(function(button) {
    if (button.id !== 'revert') {
      button.addEventListener('click', function(evnt) {
        iA.manipulateImage(evnt.target.id);
      });
    }
  });

  iA.inputElement.addEventListener('change', iA.inputImageChangeHandler);

  revertButton.addEventListener('click', iA.revertImage);
};


// Above, the `iA` "Image App" master object was built for its first run on the
// page. We were just defining a JavaScript object. Below this point, functions
// from `iA` will be invoked, and commands will be given and the DOM will be
// manipulated.


iA.buildClickHandlers();


// Turns out only one function needed to be invoked -- the handlers will built
// will take care of everything!
