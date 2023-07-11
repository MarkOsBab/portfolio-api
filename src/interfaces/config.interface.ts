interface ConfigInterface {
    port: string | undefined;
    dbUrl: string | undefined;
    appDebug: boolean;
    publicFolderUrl: string | undefined;
    secretKey: string | undefined;
    mailEmail: string | undefined;
    mailPassword: string | undefined;
}

export default ConfigInterface;