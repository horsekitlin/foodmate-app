import Config from 'react-native-config';

export const getUrl = (endpoint) => `${Config.DOMAIN}${endpoint}`;
