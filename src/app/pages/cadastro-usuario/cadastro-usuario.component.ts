import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CadastrarUsuario } from '../../services/cadastrar/cadastrar-usuario.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Usuario } from '../../types/usuario';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, InputValidationComponent, NgIf],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss',
})
export class CadastroUsuarioComponent {
  private cadastrarUsuario = inject(CadastrarUsuario);
  private notificationService = inject(NotificationService);

  formBuilder = inject(NonNullableFormBuilder);
  usuarioForm = this.formBuilder.group({
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
    ],
    email: ['', Validators.email],
    perfil: ['1', Validators.required],
    login: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
    ],
    senha: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(65)],
    ],
  });

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuarioValues = this.usuarioForm.value as Usuario;
      this.cadastrarUsuario.cadastrarUsuario(usuarioValues).subscribe(() => {
        this.notificationService.showError(
          `Usuário ${this.usuarioForm.value.nome} cadastrado com sucesso`
        );
      });
    }
  }
}
