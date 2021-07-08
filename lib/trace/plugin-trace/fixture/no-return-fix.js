function x() {
  try {
    __estrace.enter('x', 'file://no-return.js:1', arguments);
  } finally {
    __estrace.exit('x', 'file://no-return.js:1');
  }
}
