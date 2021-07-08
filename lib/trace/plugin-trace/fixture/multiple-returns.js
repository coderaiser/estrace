function getString(id, params) {
    if (a)
        return id
    
    try {
        const str = this.strings.getString(id)
        return params ? format(str, params) : str
    }
    catch (err) {
        return id
    }
}
