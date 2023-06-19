const ErrorNames: Record<string, string> = {
    GENERAL_ERROR_NAME: "General error",
    NOT_FOUND_NAME: "Not found",
    FIELD_VALIDATION_NAME: "Field validation error",
}

const ErrorMessages: Record<string, string> = {
    ID_NOT_VALID_MESSAGE: "The ID is not valid",
    NOT_FOUND_MESSAGE: "Knowledge not found",
    REQUIRED_MESSAGE: "All fields are required",
    NAME_ALREADY_EXISTS_MESSAGE: "Name already exists",
    VISIBLE_FIELD_FIELD_TYPE: "The visible field want to be an boolean of type 1 or 0",
}

export { ErrorNames, ErrorMessages };