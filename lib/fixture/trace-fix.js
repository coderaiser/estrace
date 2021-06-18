const processFile = a => {
  __estrace.enter('<anonymous:1>', arguments, 'file://hello.js:1');

  {
    const __estrace_result = a;
    __estrace.exit('<anonymous:1>', 'file://hello.js:1', __estrace_result);
    return __estrace_result;
  }
};
