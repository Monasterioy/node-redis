const errorParser = (message, code) =>{
    
    let msg = message || 'Internal server error';
    let err = new Error(msg)
    if(code) err.statusCode = code
    return err 
}

export default errorParser