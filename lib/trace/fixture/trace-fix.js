const processFile = a => {
  console.log(`enter ${'<anonymous:1>'}`, Array.from(arguments), `(${'file://arrow.js'})`);

  try {} catch (traceError) {
    console.log(`${'error'} ${'<anonymous:1>'}: ${traceError.message} (${'file://arrow.js'})`);
    throw traceError;
  } finally {
    console.log(`${'exit'} ${'<anonymous:1>'} ${'file://arrow.js'})`);
  }
};
