// This will either be available globally without using a Worker, or it will
// be available at the top-level scope of the Worker's environment.
var manipulate = function(type, red, green, blue, opacity) {
  var fn;
  var output;


  switch (type) {
    case "invert":
      fn = makePixelInverted;
      break;

    case "chroma":
      fn = makePixelChroma;
      break;

    case "greyscale":
      fn = makePixelGreyScale;
      break;

    case "vibrant":
      fn = makePixelVibrant;
      break;

    default:
      console.log("Not a valid image manipulation");
      break;
  }


  if (fn) {
    output = fn(red, green, blue, opacity);
  }


  return output;


  function makePixelInverted(r, g, b, a) {
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    return [r, g, b, a];
  }


  function makePixelChroma(r, g, b, a) {
    var max = Math.max(r, Math.max(g, b));

    if (max === g) {
      return [0, 0, 0, 0];
    } else {
      return [r, g, b, a];
    }
  }


  function makePixelGreyScale(r, g, b, a) {
    var y;

    y = (0.3 * r) + (0.59 * g) + (0.11 * b);
    r = y;
    g = y;
    b = y;

    return [r, g, b, a];
  }


  function makePixelVibrant(r, g, b, a) {
    var amt, avg, bs, gs, mx, rs;

    avg = (r + g + b) / 3.0;
    mx = Math.max(r, Math.max(g, b));
    amt = (mx / 255 * avg / 255) * (-0.4 * 3.0);

    rs = r + (amt * (mx - r));
    gs = g + (amt * (mx - g));
    bs = b + (amt * (mx - b));

    return [rs, gs, bs, a];
  }

};
