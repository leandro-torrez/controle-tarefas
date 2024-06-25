import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class CadastrarUsuario {
  private apiUrl = '/api';
  private _http = inject(HttpClient);

  cadastrarUsuario(usuario: Usuario) {
    const userBody = { ...usuario, perfil: Number(usuario.perfil) };
    return this._http.post<Usuario>(
      `${this.apiUrl}/CadastroUsuario/InserirUsuario`,
      userBody
    );
  }
}
