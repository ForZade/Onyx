import { ConfigProp, getMainConfig } from '../handleConfig/getConfig';

export function setTheme() {
    const config: ConfigProp | undefined = getMainConfig();

    switch (config?.theme) {
        case 'dark':
            return 'dark';

        case 'light':
            return 'light';

        case 'system':
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}