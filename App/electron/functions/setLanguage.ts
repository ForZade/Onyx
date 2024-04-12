import { ConfigProp, getMainConfig } from '../handleConfig/getConfig';
const languageJson = require('../src/assets/Languages.json');

export function setLanguage() {
    const config: ConfigProp | undefined = getMainConfig();

    if (!config || !config.language) {
        return languageJson.en;
    }
    return languageJson[config.language];
}