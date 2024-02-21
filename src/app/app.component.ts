import {Component} from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {BoardComponent} from "@app/components/board/board.component";
import {SignupComponent} from "@app/pages/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,BoardComponent,SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-tracker';
}
