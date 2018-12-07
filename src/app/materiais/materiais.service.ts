import { Injectable } from '@angular/core';

import { Materiais } from './materiais.model';
import { URL_API } from '../app.config';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService {

  constructor(private http: Http) { }

  materiais(start: number, limit: number, page: number): Observable<any[]>{

    let body = JSON.stringify({
      Start: start,
      Limit: limit,
      Page: page
    })

    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Listar`, body, options)
            .pipe(map(response => response.json().Content), catchError(ErrorHandler.handleError))
  }

  save(data: Materiais): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Salvar`, body, options)
      .pipe(map(response => response.json()), catchError(ErrorHandler.handleError))
  }

  remove(data: Materiais): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Remover`, body, options)
      .pipe(map(response => response.json()), catchError(ErrorHandler.handleError))
  }

}
