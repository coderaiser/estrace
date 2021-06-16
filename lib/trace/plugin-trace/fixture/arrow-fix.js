const processFile = a => {
  console.log(`enter ${'<anonymous:1>'}`, Array.from(arguments));

  try {} catch (traceError) {
    console.log(`${'error'} ${'<anonymous:1>'}: ${traceError.message}`);
    throw traceError;
  } finally {
    console.log(`${'exit'} ${'<anonymous:1>'}`);
  }
};
