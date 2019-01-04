import { HostListener } from "@angular/core";
import { Router } from "@angular/router";

export class CadastroCrud {

    rotaNavegacaoLista: string

    constructor(public router: Router) {}

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if(event.key === 'Escape'){
            this.navegarParaLista()
        }
    }

    navegarParaLista(){
        this.router.navigate([this.rotaNavegacaoLista])
    }
}