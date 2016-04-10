var uuid = require('node-uuid');

// entropy wrapper for number types
function int(target, key, descriptor) {
  return _wrap(target, key, descriptor, _int);
}
module.exports.int = int;

// default modifier for number types
function _int(current_val) {
  return current_val + (Math.random() - 0.5);
}

// entropy wrapper for character types (eg single character strings)
function char(target, key, descriptor) {
  return _wrap(target, key, descriptor, _char);
}
module.exports.char = char;

// default modifier for number types
function _char(current_val) {
  var code = (current_val.charCodeAt(0) + 2 * (Math.random() - 0.5));
  return String.fromCharCode(Math.round(code));
}

// entropy wrapper for strings
function str(target, key, descriptor) {
  return _wrap(target, key, descriptor, _str);
}
module.exports.str = str;

// default modifier for string types
function _str(current_val) {
  return current_val.split('').map(function(char) {
    if (Math.random() < 0.1) {
      // modify the string as a sequence of characters
      char = _char(char);
    }
    return char;
  }).join('');
}

// entropy wrapper for an arbitrary type
function any(modifier) {
  return function(target, key, descriptor) {
      return _wrap(target, key, descriptor, modifier);
  };
}
module.exports.any = any;

// The magic to the decorators
function _wrap(target, key, descriptor, modifier) {
  var tmp = descriptor.value;
  var cached_prop = '_' + key + '_' + uuid.v4();
  target[cached_prop] = tmp();
  descriptor.value = function(val) {
    if (val) {
      target[cached_prop] = val;
      return target;
    } else {
      target[cached_prop] = modifier(target[cached_prop]);
      return target[cached_prop];
    }
  };
  return descriptor;
}
