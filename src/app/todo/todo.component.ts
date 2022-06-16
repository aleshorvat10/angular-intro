import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  title:string='';
  tasks: Task[]=[
    {title: 'Learn Typescript', completed: false},
    {title: 'Learn HTML', completed: false},
    {title: 'Learn english', completed: true}
  ];
  constructor() { }
  deteleTask(taskToDelete: Task)
  {
    this.tasks=this.tasks.filter(taks => taks!=taskToDelete);
    this.Save();
  }
  ngOnInit(): void {
    const taskAsString = localStorage.getItem("tasks");
    if(taskAsString)
      this.tasks=JSON.parse(taskAsString);
    console.table(this.tasks);
  }
  add(){
    this.tasks.push({
      title: this.title,
      completed: false
    })
    this.title='';
    this.Save();
  }
  Save()
  {
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }
}
interface Task{
  title: string;
  completed: boolean;
}