const ErrorNames: Record<string, string> = {
    GENERAL_ERROR_NAME: "General error",
    NOT_FOUND_NAME: "Not found",
}

const ErrorMessages: Record<string, string> = {
    NOT_FOUND_MESSAGE: "Contact not found",
    ID_NOT_VALID_MESSAGE: "The ID is not valid",
    NOT_CREATED_MESSAGE: "Some failed and the contact are not created",
    ALREADY_CONTACT_REQUEST_IN_REPLY_LIST: "Already has an request in the reply list, please wait for reply to make another contact request",
    
}

export { ErrorNames, ErrorMessages };