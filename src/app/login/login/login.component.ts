import { Component, inject } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { Login } from '../../types/login';
import { LoginService } from '../../services/login/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, FormsModule, InputValidationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);
  formLogin: Login = {
    login: '',
    senha: '',
  };

  efetuarLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.formLogin).subscribe((user) => {
        this.router.navigate(['']);
      });
    }
  }
}
