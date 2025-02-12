import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public menu: any[] = [];

  constructor(private readonly http: HttpClient) { }

  loadMenu(): Observable<void> {
    let urlProduction = "";
    if(environment.production){
      urlProduction = "/agendei"
    }
    return this.http.get<{ [key: string]: string }>(`${urlProduction}/assets/configuration/menu.json`).pipe(
      map((data: any) => {
        this.menu = data;
      })
    );
  }
}
