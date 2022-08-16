for (let i = 0; i < 100_000; i++) {
    if (i > 9999)
        m();
    
    hot();
}

function hot() {
}

function m() {
}
