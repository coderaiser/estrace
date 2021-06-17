let i = 1;

export function enter(name, args, url) {
    i *= 2;
    console.log(`${Array(i).join('.')}.💣  ${name}(${Array.from(args).join(', ')})`, String(url));
}

export function exit(name, result, url) {
    console.log(`${Array(i).join('.')}.💥 ${name} ->`, result, String(url));
    i /= 2;
}
