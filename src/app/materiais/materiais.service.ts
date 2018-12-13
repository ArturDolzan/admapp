import { Injectable } from '@angular/core';

import { Materiais } from './materiais.model';
import { URL_API } from '../app.config';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ErrorHandler } from '../app.error-handler';
import { AppHeaders } from '../shared/auth/app-headers';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService extends AppHeaders {

  constructor(private http: Http) {
    super()
   }

  materiais(start: number, limit: number, page: number, filter: string): Observable<any[]>{
    
    if(filter){
      return this.filtrarMateriais(start, limit, page, filter)
    }

    let body = JSON.stringify({
      Start: start,
      Limit: limit,
      Page: page
    })

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Listar`, body, options)
            .pipe(map(response => response.json().Content))            
  }

  filtrarMateriais(start: number, limit: number, page: number, filter: string): Observable<any[]>{

    let body = JSON.stringify({
      Start: start,
      Limit: limit,
      Page: page,
      Filter: filter
    })

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Filtrar`, body, options)
            .pipe(map(response => response.json().Content))            
  }

  save(data: Materiais): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Salvar`, body, options)
      .pipe(map(response => response.json()))
  }

  remove(data: Materiais): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Remover`, body, options)
      .pipe(map(response => response.json()))
  }

}
