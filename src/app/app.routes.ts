import { Routes } from '@angular/router';
import {SignupComponent} from "@app/pages/signup/signup.component";
import {BoardComponent} from "@app/components/board/board.component";

export const routes: Routes = [
  {path: '',redirectTo: '/sign-up',pathMatch:'full'},
  {path: 'sign-up', component: SignupComponent,title:"Sign up"},
  {path: 'board', component: BoardComponent,title:"Task Board"},
];
