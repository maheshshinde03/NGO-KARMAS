import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guard/auth.guard';
import { currentMenu } from '@shared/utils/current-menu';
import { EncryptedStorage } from '@shared/utils/encrypted-storage';

@Component({
  selector: 'app-error-page-1',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error-page-1.component.html',
  styleUrl: './error-page-1.component.scss'
})
export class ErrorPage1Component implements OnInit {
  currentMenu: any;

  constructor(public router: Router, private authGuard: AuthGuard) { }
  ngOnInit(): void {
    this.currentMenu = currentMenu();
  }

  redirectToDefaultPage() {
    console.log('this.currentMenu', this.currentMenu);
    // // ✅ Navigate to first permitted page
    if (this.currentMenu && this.currentMenu.length > 0) {
      const firstRoute = this.currentMenu[0].path;
      this.router.navigate([firstRoute]);
    } else {
      this.authGuard.resetGuard();
      new EncryptedStorage().clearAll();
      this.router.navigate(['/auth/login'])
      return;
    }
  }
}
