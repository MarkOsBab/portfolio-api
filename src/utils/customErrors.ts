export default class CustomError {
    public static generateCustomError(name:string, message:string) {
        const customError = new Error(message);
        customError.name = name;
        throw customError;
    }
}