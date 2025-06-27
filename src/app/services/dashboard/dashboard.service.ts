import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private readonly http: HttpClient) { }


  public dashboard() : Observable<any> {
    return this.http.get<String>(`dashboard`);
  }
}
