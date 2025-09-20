import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, expand, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';

  constructor(private http: HttpClient) {}

  getJsonFile<T = any>(filename: string) {
    return this.http.get<T>(`${this.basePath}data/${filename}`);
  }

  loadAllChunks<T>(baseName: string) {
    let index = 1;
    return of(null).pipe(
      expand(() => {
        const fileName =
          index === 1 ? `${baseName}_data.json` : `${baseName}_data${index}.json`;
        index++;
        console.log(`${this.basePath}data/${fileName}`);
        return this.http.get<T[]>(`${this.basePath}data/${fileName}`).pipe(
          catchError(() => of(null))
        );
      }),
      takeWhile((data) => data !== null),
      reduce((all, chunk) => all.concat(chunk!), [] as T[])
    );
  }
}
