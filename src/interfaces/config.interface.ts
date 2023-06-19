interface ConfigInterface {
    port: string | undefined;
    dbUrl: string | undefined;
    appDebug: boolean;
    publicFolderUrl: string | undefined;
}

export default ConfigInterface;