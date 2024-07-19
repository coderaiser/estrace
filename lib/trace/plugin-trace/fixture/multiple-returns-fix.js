function getString(id, params) {
    try {
        var __estrace_context = __estrace.enter('getString', 'file://*:1', arguments);
        
        if (a)
            return id;
        
        try {
            const str = this.strings.getString(id);
            return params ? format(str, params) : str;
        } catch(err) {
            return id;
        }
    } finally {
        __estrace.exit('getString', 'file://*:1', __estrace_context);
    }
}
