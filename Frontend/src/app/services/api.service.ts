import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService{
  constructor(
    private httpClient: HttpClient
  ) {
  }

  post<T>(url: string, data: any, options?: { [index: string]: any }) {
    return this.httpClient.post<T>(url, data, options);
  }

  get<T>(url: string, params?: HttpParams){
    return this.httpClient.get<T>(url, {params})
  }
}
