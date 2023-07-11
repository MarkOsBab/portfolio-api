interface ContactInterface {
    firstname: string,
    lastname?: string,
    email: string,
    message: string,
    code?: string,
    was_answered?: boolean,
};

export default ContactInterface;