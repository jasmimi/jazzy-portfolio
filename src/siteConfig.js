const envWipMode = process.env.REACT_APP_WIP_MODE;

export const isWipMode = envWipMode ? envWipMode !== 'false' : false;
