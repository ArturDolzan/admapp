import {Response} from '@angular/http'
import {throwError} from 'rxjs';


export class ErrorHandler {

     static handleError(error: Response | any){
        let errorMessage: string

        if(error instanceof Response){
            // @ts-ignore
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText} - ${JSON.parse(error._body).Mensagem}`
        }else{
            errorMessage = error.toString()
        }

        //const notificationService =  InjectorInstance.get<NotificationService>(NotificationService)

        //notificationService.notify(errorMessage)

        console.log(errorMessage)

        return throwError(errorMessage)
    }
}