import { CrudService } from '../../../shared/services/crudService.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends CrudService {

  constructor(public http: Http) {
    super(http)

    this.controllerName = 'Usuarios'

   }

   
}
