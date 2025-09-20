import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private jsonUrl = 'data/items_data.json';

  constructor (private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getJsonFile<T = any>(filename: string): Observable<T> {
    return this.http.get<T>(`data/${filename}`);
  }
}
