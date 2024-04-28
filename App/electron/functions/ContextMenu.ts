import { Menu, MenuItemConstructorOptions } from 'electron';

export class ContextMenu {
  static buildContextMenu(): Menu {
    const template: MenuItemConstructorOptions[] = [
      { label: 'Item 1', click: () => console.log('Clicked Item 1') },
      { label: 'Item 2', click: () => console.log('Clicked Item 2') },
      { type: 'separator' },
      { label: 'Item 3', click: () => console.log('Clicked Item 3') }
    ];

    return Menu.buildFromTemplate(template);
  }
}
