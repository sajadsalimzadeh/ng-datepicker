import {Component, HostBinding, OnInit} from "@angular/core";
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {Themes} from "../../core/types";

@Component({
  selector: 'doc-layout',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  menus = [
    {text: 'Get Started', link: 'get-started', icon: 'far fa-home'},
    {text: 'Color Pallet', link: 'color-pallet', icon: 'far fa-palette'},
    {text: 'Button', link: 'button', icon: 'far fa-computer-mouse'},
    {text: 'Timeline', link: 'timeline', icon: 'far fa-timeline'},
    {text: 'Data Table', link: 'data-table', icon: 'far fa-table'},
    {text: 'Paginator', link: 'paginator', icon: 'far fa-ellipsis-stroke'},
    {text: 'Progress Bar', link: 'progress-bar', icon: 'far fa-bars-progress'},
    {text: 'Scroll top', link: 'scroll-top', icon: 'far fa-up-down'},
    {text: 'Skeleton', link: 'skeleton', icon: 'far fa-loader'},
    {text: 'Tab', link: 'tab', icon: 'far fa-list-dropdown'},
    {text: 'Tag', link: 'tag', icon: 'far fa-tag'},
    {text: 'Message', link: 'message', icon: 'far fa-envelope'},
    {text: 'Dialog', link: 'dialog', icon: 'far fa-rectangle-history'},
    {text: 'Tooltip', link: 'tooltip', icon: 'far fa-message-middle-top'},
    {text: 'Code', link: 'code', icon: 'far fa-code'},
    {
      text: 'Forms', icon: 'far fa-input-text', children: [
        {text: 'Input', link: 'forms/input', icon: 'far fa-input-text'},
        {text: 'Date Picker', link: 'forms/date-picker', icon: 'far fa-calendar'},
        {text: 'Checkbox', link: 'forms/checkbox', icon: 'far fa-square-check'},
        {text: 'Radio', link: 'forms/radio', icon: 'far fa-list-radio'},
        {text: 'Rate', link: 'forms/rate', icon: 'far fa-star'},
        {text: 'Switch', link: 'forms/switch', icon: 'far fa-toggle-large-on'},
        {text: 'Select', link: 'forms/select', icon: 'far fa-ballot-check'},
        {text: 'Chips', link: 'forms/chips', icon: 'far fa-pen-field'},
        {text: 'Volume', link: 'forms/volume', icon: 'far fa-slider'},
        {text: 'Color Picker', link: 'forms/color-pallet-picker', icon: 'far fa-eye-dropper-half'},
        {text: 'Key Filter', link: 'forms/key-filter', icon: 'far fa-keyboard'},
        {text: 'Password', link: 'forms/password', icon: 'far fa-key'},
      ]
    },
  ];
  activeMenu: any;

  isMenuOpen: boolean = true;

  theme: Themes = 'default-light';
  themes: Themes[] = ['default-light', "default-dark"]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      e = e.routerEvent;
      if (e instanceof NavigationEnd) {
        this.processUrl(e.url);
      }
    });
    this.setTheme(this.theme)
  }

  setTheme(theme: Themes) {
    document.documentElement.className = 'theme-' + theme;
  }

  selectMenu(menu: any) {
    if (menu.open) {
      menu.open = false;
      return;
    }
    this.iterateMenus(this.menus, x => x.open = false);
    const menus = this.findMenuHierarchy(this.menus, x => x == menu);
    menus.forEach(x => x.open = true);
  }

  iterateMenus(menus: any[], action: (menu: any) => void) {
    menus.forEach(x => {
      action(x);
      if (x.children) this.iterateMenus(x.children, action);
    })
  }

  findMenuHierarchy(menus: any[], filter: (menu: any) => boolean) {
    const result: any[] = [];
    const recFunc = (menus: any[]) => {
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.children) {
          if (recFunc(menu.children)) {
            result.push(menu);
            return true;
          }
        }
        if (filter(menu)) {
          result.push(menu);
          return true;
        }
      }
      return false;
    };
    recFunc(menus);
    return result;
  }

  processUrl(url: string) {
    this.activeMenu = null;
    this.iterateMenus(this.menus, (m) => m.open = false);
    const menus = this.findMenuHierarchy(this.menus, (m) => url.includes(m.link));
    if (menus.length > 0) {
      this.activeMenu = menus[0];
      menus.forEach(x => x.open = true);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

}
