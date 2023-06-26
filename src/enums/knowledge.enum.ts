const ErrorNames: Record<string, string> = {
    GENERAL_ERROR_NAME: "General error",
    NOT_FOUND_NAME: "Not found",
    FIELD_VALIDATION_NAME: "Field validation error",
}

const ErrorMessages: Record<string, string> = {
    NOT_FOUND_MESSAGE: "Knowledge not found",
    REQUIRED_MESSAGE: "All fields are required",
    NAME_ALREADY_EXISTS_MESSAGE: "Name already exists",
    ID_NOT_VALID_MESSAGE: "The ID is not valid",
}

export { ErrorNames, ErrorMessages };