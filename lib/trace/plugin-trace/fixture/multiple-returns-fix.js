function getString(id, params) {
    try {
        __estrace.enter('getString', 'file://*:1', arguments);
        if (a)
            return id

        try {
            const str = this.strings.getString(id)
            return params ? format(str, params) : str
        }
        catch (err) {
            return id
        }
    } finally {
        __estrace.exit('getString', 'file://*:1');
    }
}
