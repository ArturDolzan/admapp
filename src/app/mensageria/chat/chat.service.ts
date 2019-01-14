import { Injectable } from "@angular/core";
import { CrudService } from "src/app/shared/services/crudService.service";
import { Http } from "@angular/http";

@Injectable({
    providedIn: 'root'
})

export class ChatService extends CrudService {

    constructor(public http: Http) {
        super(http)
    }
}