import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user'; 
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App demoing http mock module !';
  users : User[];

  constructor(private service: UserService) {}

  ngOnInit() {
  
    this.service.getUsers()
      .subscribe(
        users => this.users = users
      );
  }
}
