import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { map, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { AppHeaders } from '../auth/app-headers';
import { URL_API } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CrudService extends AppHeaders {

  constructor(public http: Http) {
    super()
   }

   controllerName: string

  list(start: number, limit: number, page: number, filter: string, includes?: string[]): Observable<any[]>{
    
    if(filter){  
      return this.filter(start, limit, page, filter, includes)
    }

    let body = JSON.stringify({
      Start: start,
      Limit: limit,
      Page: page,
      includes: includes
    })

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/${this.controllerName}/Listar`, body, options)
            .pipe(map(response => response.json().Content))            
  }

  filter(start: number, limit: number, page: number, filter: string, includes?: string[]): Observable<any[]>{

    let body = JSON.stringify({
      Start: start,
      Limit: limit,
      Page: page,
      Filter: filter,
      includes: includes
    })

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/${this.controllerName}/Filtrar`, body, options)
            .pipe(map(response => response.json().Content))            
  }

  save(data: any): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/${this.controllerName}/Salvar`, body, options)
      .pipe(map(response => response.json()))
  }

  remove(data: any): Observable<any>{
    
    let body = JSON.stringify(data)

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/${this.controllerName}/Remover`, body, options)
      .pipe(map(response => response.json()))
  }

  recuperarPorId(id: number, includes?: string[]): Observable<any>{
    let body = JSON.stringify({
      Id: id,
      includes: includes
    })

    let headers      = this.getHeaders();
    let options      = new RequestOptions({ headers: headers }); 

    return this.http.post(`${URL_API}/${this.controllerName}/RecuperarPorId`, body, options)
      .pipe(map(response => response.json()))
  }

}
