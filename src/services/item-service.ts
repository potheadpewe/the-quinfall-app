import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, expand, map, Observable, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private jsonUrl = 'data/items_data.json';

  constructor (private http: HttpClient) {}

  getJsonFile<T = any>(filename: string): Observable<T> {
    return this.http.get<T>(`data/${filename}`);
  }

  loadAllChunks<T>(baseName: string): Observable<T[]> {
    let index = 1;
    return of(null).pipe(
      expand(() => {
        const fileName =
          index === 1 ? `${baseName}_data.json` : `${baseName}_data${index}.json`;
        return this.http.get<T[]>(`assets/data/${fileName}`).pipe(
          catchError(() => of(null)),
          map((data) => {
            index++;
            return data;
          })
        );
      }),
      takeWhile((data) => data !== null),
      reduce((all, chunk) => all.concat(chunk!), [] as T[])
    );
  }
}
