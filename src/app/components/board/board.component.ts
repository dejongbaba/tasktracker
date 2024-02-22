import {Component, OnInit} from '@angular/core';
import {CardComponent} from "@app/components/card/card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {Task} from "@app/components/board/board.model";
import {CommonModule} from "@angular/common";
import {TaskService} from "@app/services/task.service";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    DragDropModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  newTaskForm: FormGroup;

  constructor(public dialog: MatDialog,public taskService:TaskService) {
    this.newTaskForm = new FormGroup({
      'name' : new FormControl(null),
      'desc' : new FormControl(null),
      'date' : new FormControl()
    })
  }

  open:Array<Task> = [];
  pending:Array<Task> = [];
  inProgress:Array<Task> = [];
  completed:Array<Task> = [];

  ngOnInit() {

    this.newTaskForm = new FormGroup({
      'name' : new FormControl(null),
      'desc' : new FormControl(null),
      'date' : new FormControl()
    })

    let open = localStorage.getItem('open');
    if (open) {
      this.open = JSON.parse(open);
    }

    let inProgress = localStorage.getItem('inProgress');
    if (inProgress) {
      this.inProgress = JSON.parse(inProgress);
    }

    let pending = localStorage.getItem('pending');
    if (pending) {
      this.pending = JSON.parse(pending);
    }

    let completed = localStorage.getItem('completed');
    if (completed) {
      this.completed = JSON.parse(completed);
    }
    // this.taskService.getTasks().then((res)=>console.log('res',res)).catch((e)=> console.log('e',e))
  }

  addTask() {
    this.newTaskForm.value.date = new Date()

    this.open.push(this.newTaskForm.value);

    this.newTaskForm.reset()
    localStorage.setItem('open', JSON.stringify(this.open));
    this.newTaskForm.value.date = new Date();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    localStorage.setItem('open', JSON.stringify(this.open));
    localStorage.setItem('pending', JSON.stringify(this.pending));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    localStorage.setItem('completed', JSON.stringify(this.completed));
  }


  deleteTask(date:Date, type:String){
    switch (type) {
      case 'open':
        this.open = this.open.filter((item) => item.date !== date)
        localStorage.setItem('open', JSON.stringify(this.open));
        break;

      case 'pending':
        this.pending = this.pending.filter((item) => item.date !== date)
        localStorage.setItem('pending', JSON.stringify(this.pending));
        break;

      case 'inProgress':
        this.inProgress = this.inProgress.filter((item) => item.date !== date)
        localStorage.setItem('done', JSON.stringify(this.inProgress));
        break;

      case 'completed':
        this.completed = this.completed.filter((item) => item.date !== date)
        localStorage.setItem('completed', JSON.stringify(this.completed));
        break;

      default:
        break;
    }
  }
}
