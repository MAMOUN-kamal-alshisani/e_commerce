
// middleware controllers 
export function notFound(req,res,next){

const error = new Error(`Error, Not Found ${req.originalUrl}`)
res.status(404)

next(error)
}


export function handleError(err,req,res,next){

    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    req.status(statusCode);

    res.json({
        message:err?.message,
        stack:err?.stack
    })
}


// module.exports = {notFound,handleError}
