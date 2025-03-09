// export class CustomError extends Error {
//     /**
//      * Custom Error with HTTP status code
//      * @param {string} message - Error message
//      * @param {number} statusCode - HTTP status code
//      */
//     constructor(message, statusCode = 500) {
//         super(message);
//         this.statusCode = statusCode;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }


export const response = (data) => {
    let response = { statusCode, message, data , status }
    response.statusCode = data.statusCode,
        response.message = data.message,
        response.data = data.data,
        response.status = data.status
        return response;
}