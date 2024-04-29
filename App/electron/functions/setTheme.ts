import { getMainConfig } from '../handleConfig/getConfig';

export function setTheme(theme?: string) {
    if (!theme) {
        const config: any = getMainConfig();
        theme = config.theme;
    }

    switch (theme) {
        case 'dark':
            return 'dark';

        case 'light':
            return 'light';

        case 'system':
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}