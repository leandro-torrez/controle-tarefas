import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-button-logout',
  standalone: true,
  imports: [],
  templateUrl: './button-logout.component.html',
  styleUrl: './button-logout.component.scss',
})
export class ButtonLogoutComponent {
  private loginService = inject(LoginService);
  logout() {
    this.loginService.logout();
  }
}
