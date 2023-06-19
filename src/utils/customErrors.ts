export class CustomError {
    static generateCustomError({name, message}: Record<string, string>): Error {
        const customError = new Error(message);
        Object.defineProperty(customError, 'name', {value: name});
        throw customError;
    }
}