import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  private usersUrl: string = '/api/users';

  constructor(private http: Http) {}

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(res => res.json().data)
  }
}