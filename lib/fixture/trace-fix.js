const processFile = a => {
  try {
    __estrace.enter('<anonymous:1>', 'file://hello.js:1', arguments);
    return a;
  } finally {
    __estrace.exit('<anonymous:1>', 'file://hello.js:1');
  }
};
