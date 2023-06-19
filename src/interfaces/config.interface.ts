interface ConfigInterface {
    port: string | undefined;
    dbUrl: string | undefined;
    appDebug: string | undefined | boolean;
}

export default ConfigInterface;