const initOperator = (runnerState) => (name) => {
  console.log(`enter ${'<anonymous:1>'}`, Array.from(arguments), `(${'file://inner.js'})`);

  try {} catch (traceError) {
    console.log(`${'error'} ${'<anonymous:1>'}: ${traceError.message} (${'file://inner.js'})`);
    throw traceError;
  } finally {
    console.log(`${'exit'} ${'<anonymous:1>'} ${'file://inner.js'})`);
  }
};
