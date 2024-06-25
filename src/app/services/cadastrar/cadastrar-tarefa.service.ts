import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefas } from '../../types/tarefas';

@Injectable({
  providedIn: 'root',
})
export class CadastrarTarefaService {
  private apiUrl = '/api';
  private _http = inject(HttpClient);

  cadastrarTarefa(titulo: string) {
    return this._http.post<string>(
      `${this.apiUrl}/CadastroTarefa/InserirTarefa`,
      { titulo }
    );
  }

  listarTarefas(): Observable<Tarefas> {
    return this._http.get<Tarefas>(
      `${this.apiUrl}/CadastroTarefa/ListarTodasTarefas`
    );
  }
  excluirTarefa(titulo: string) {
    const params = new HttpParams().set('nomeTarefa', titulo);
    return this._http.delete<string>(
      `${this.apiUrl}/CadastroTarefa/DeletarTarefa`,
      { params }
    );
  }
}
