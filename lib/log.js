let i = 1;

export /* __estrace.skip() */ function enter(name, args, url) {
    i *= 2;
    console.log(`${Array(i).join('.')}.💣 ${name}(${Array.from(args).join(', ')})`, String(url));
}

export /* __estrace.skip() */ function exit(name, result, url) {
    console.log(`${Array(i).join('.')}.💥 ${name} ->`, result, String(url));
    i /= 2;
}

