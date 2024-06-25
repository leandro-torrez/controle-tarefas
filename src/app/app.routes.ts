import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { loggedGuard } from './guard/logged.guard';
import { authenticateGuard } from './guard/authenticate.guard';
import { CadastroTarefasComponent } from './pages/cadastro-tarefas/cadastro-tarefas.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loggedGuard],
  },
  {
    path: 'cadastro-tarefas',
    component: CadastroTarefasComponent,
    canActivate: [authenticateGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'cadastro-tarefas',
    pathMatch: 'full',
  },
  {
    path: 'cadastro-usuario',
    component: CadastroUsuarioComponent,
    canActivate: [authenticateGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
