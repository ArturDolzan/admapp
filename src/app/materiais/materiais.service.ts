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

  materiais(): Observable<Materiais[]>{

    let body = JSON.stringify({
      Start: 1,
      Limit: 5,
      Page: 1
    })

    let headers      = new Headers({ 'Content-Type': 'application/json' }); 
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/Materiais/Listar`, body, options)
            .pipe(map(response => response.json().Content), catchError(ErrorHandler.handleError))
           

  }
}
