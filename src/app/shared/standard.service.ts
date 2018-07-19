import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StandardService {

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get('http://localhost:3000/category').toPromise();
  }
}
