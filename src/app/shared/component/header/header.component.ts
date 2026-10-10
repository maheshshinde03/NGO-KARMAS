import { Component, Inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NavmenuService, Menu } from '../../services/navmenu.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { LanguageComponent } from './language/language.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { CartComponent } from './cart/cart.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { GlobalConfig } from '@shared/configs/global-config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ThemeComponent, SearchComponent, NotificationComponent,
    ProfileComponent, MessagesComponent, LanguageComponent, BookmarkComponent, CartComponent, SvgIconComponent],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public menuItems: Menu[] = [];
  public item: Menu[] = [];
  public open = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public show = false;
  public elem: any;
  public isFullScreen: boolean = false;
  currentCustomerDetails: any
  role_id:any;

  constructor(@Inject(DOCUMENT) private document: any, public layout: LayoutService, public navmenu: NavmenuService) {
    this.navmenu.item.subscribe((menuItems: Menu[]) =>
      this.item = menuItems
    );
  }

  ngOnInit() {
    this.elem = document.documentElement;
  }

  openMenu() {
    this.navmenu.closeSidebar = !this.navmenu.closeSidebar;
  }
  openSearch() {
    this.show = !this.show
    this.searchResult = false;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach((data) => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter((subItems:any) => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = data.icon
          items.push(subItems);
        }
        subItems.children?.filter((suSubItems:any) => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
    })
    return
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas')
  }

  removeFix() {
    this.searchResult = false;
    this.text = "";
    document.body.classList.remove('offcanvas')
  }

  clickOutside(): void {
    this.show = false;
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
    this.navmenu.language = false;
  }


  openFullscreen() {
    if (!this.isFullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      this.closeFullscreen()
    }

    this.isFullScreen = !this.isFullScreen;
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
