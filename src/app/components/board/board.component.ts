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

  todo:Array<Task> = [];
  doing:Array<Task> = [];
  done:Array<Task> = [];
  rejected:Array<Task> = [];

  ngOnInit() {

    this.newTaskForm = new FormGroup({
      'name' : new FormControl(null),
      'desc' : new FormControl(null),
      'date' : new FormControl()
    })

    let localtodo = localStorage.getItem('todo');
    if (localtodo) {
      this.todo = JSON.parse(localtodo);
    }

    let localdoing = localStorage.getItem('doing');
    if (localdoing) {
      this.doing = JSON.parse(localdoing);
    }

    let localdone = localStorage.getItem('done');
    if (localdone) {
      this.done = JSON.parse(localdone);
    }

    let localrejected = localStorage.getItem('rejected');
    if (localrejected) {
      this.rejected = JSON.parse(localrejected);
    }
    this.taskService.getTasks().then((res)=>console.log('res',res)).catch((e)=> console.log('e',e))
  }

  addTask() {
    this.newTaskForm.value.date = new Date()

    this.todo.push(this.newTaskForm.value);

    this.newTaskForm.reset()
    localStorage.setItem('todo', JSON.stringify(this.todo));
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

    localStorage.setItem('todo', JSON.stringify(this.todo));
    localStorage.setItem('doing', JSON.stringify(this.doing));
    localStorage.setItem('done', JSON.stringify(this.done));
    localStorage.setItem('rejected', JSON.stringify(this.rejected));
  }


  deleteTask(date:Date, type:String){
    switch (type) {
      case 'todo':
        this.todo = this.todo.filter((item) => item.date !== date)
        localStorage.setItem('todo', JSON.stringify(this.todo));
        break;

      case 'doing':
        this.doing = this.doing.filter((item) => item.date !== date)
        localStorage.setItem('doing', JSON.stringify(this.doing));
        break;

      case 'done':
        this.done = this.done.filter((item) => item.date !== date)
        localStorage.setItem('done', JSON.stringify(this.done));
        break;

      case 'rejected':
        this.rejected = this.rejected.filter((item) => item.date !== date)
        localStorage.setItem('rejected', JSON.stringify(this.rejected));
        break;

      default:
        break;
    }
  }
}
