import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/services/crudService.service";
import { Http, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import { URL_API } from "src/app/app.config";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ChatService extends CrudService {

    constructor(public http: Http) {
        super(http)

        this.controllerName = 'ChatHub'
    }

    RecuperarUsuariosConectadosChat(): Observable<any[]>{
    
        let headers      = this.getHeaders();
        let options      = new RequestOptions({ headers: headers }); 
    
        return this.http.post(`${URL_API}/${this.controllerName}/RecuperarUsuariosConectadosChat`, options)
                .pipe(map(response => response.json().Content))            
      }
}