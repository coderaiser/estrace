export function set2(extra) {
  try {
    __estrace.enter('set2', 'file://arrow.js:1', arguments);
    extra += `\n${a}\n ${b}\n  ${c}\n   ${d}\n`
    return extra;
  } finally {
    __estrace.exit('set2', 'file://arrow.js:1');
  }
}
