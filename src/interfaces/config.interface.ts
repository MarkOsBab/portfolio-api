interface ConfigInterface {
    port: string | undefined;
    dbUrl: string | undefined;
    appDebug: boolean;
    publicFolderUrl: string | undefined;
    secretKey: string | undefined;
}

export default ConfigInterface;