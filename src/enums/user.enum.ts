const ErrorNames: Record<string, string> = {
    GENERAL_ERROR_NAME: "General error",
    NOT_FOUND_NAME: "Not found",
    INVALID_CREDENTIALS_NAME: "Invalid credentials",
}

const ErrorMessages: Record<string, string> = {
    EMAIL_ALREADY_REGISTRED: "The email is already registred",
    USERNAME_ALREADY_REGISTRED: "The username is already registred",
    NOT_FOUND_MESSAGE: "User not found",
    INVALID_CREDENTIALS_MESSAGE: "Credentials not valid"
}

export { ErrorNames, ErrorMessages };