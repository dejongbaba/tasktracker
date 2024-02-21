import { Component } from '@angular/core';
import {CardComponent} from "@app/components/card/card.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

}
