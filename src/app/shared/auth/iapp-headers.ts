import { Headers } from "@angular/http";

export interface IAppHeaders {
    getHeaders(): Headers
    getUsuario(): string
}