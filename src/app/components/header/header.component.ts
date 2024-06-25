import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonLogoutComponent } from '../button-logout/button-logout.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, ButtonLogoutComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
