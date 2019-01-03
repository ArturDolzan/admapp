import { Injectable } from '@angular/core';
import { CrudService } from '../shared/services/crudService.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MateriaisService extends CrudService {

  constructor(public http: Http) {
    super(http)

    this.controllerName = 'Materiais'
   }

  }
