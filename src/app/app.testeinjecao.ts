import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class TesteInjecaoClasse {

    constructor(){
        console.log('chamou construtor!')
    }

    fazTeste(){
        console.log('metodo faz teste')
    }
}