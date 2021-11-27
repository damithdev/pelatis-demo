export class MenuItem {
    public name: string;
    public path: string;
    public icon: string;

    constructor(item: any){
        this.name = item.name || '';
        this.path = item.path || '';
        this.icon = item.icon || '';
    }
}

export enum MenuItemCategory{
    Home = 'HOME',
    Setting = 'SETTINGS'
}