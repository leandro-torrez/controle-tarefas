import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CadastrarTarefaService } from '../../services/cadastrar/cadastrar-tarefa.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Tarefas } from '../../types/tarefas';
import { NotificationService } from '../../services/notification/notification.service';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';

@Component({
  selector: 'app-cadastro-tarefas',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, InputValidationComponent],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.scss',
})
export class CadastroTarefasComponent implements OnInit {
  private cadastrarTarefaService = inject(CadastrarTarefaService);
  private notificationService = inject(NotificationService);
  listarTarefas$ = new Observable<Tarefas>();
  formBuilder = inject(FormBuilder);
  tarefaForm = this.formBuilder.group({
    titulo: ['', Validators.required],
  });
  ngOnInit(): void {
    this.listarTarefas();
  }

  listarTarefas() {
    this.listarTarefas$ = this.cadastrarTarefaService.listarTarefas();
  }

  onSubmit() {
    this.notificationService.hideError();
    if (this.tarefaForm.valid) {
      this.cadastrarTarefaService
        .cadastrarTarefa(this.tarefaForm.value.titulo!)
        .subscribe((tarefa) => {
          this.tarefaForm.reset();
          this.listarTarefas();
          this.notificationService.showError('Usuário Cadastrado com Sucesso');
        });
    }
  }

  excluirTarefa(titulo: string) {
    this.notificationService.hideError();
    this.cadastrarTarefaService.excluirTarefa(titulo).subscribe(() => {
      this.listarTarefas();
      this.notificationService.showError('Usuário excluido com sucesso');
    });
  }
}
