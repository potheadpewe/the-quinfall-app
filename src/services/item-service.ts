import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, expand, map, Observable, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';

  constructor(private http: HttpClient) {}

  loadAllChunks<T>(baseName: string): Observable<T[]> {
  const singularUrl = `${this.basePath}data/${baseName}_data.json`;

  return this.http.get<T[]>(singularUrl).pipe(
      // ✅ If singular file exists, return it
      map((data) => data || []),
      catchError(() => {
        // 🔁 Otherwise, fall back to chunked files
        let index = 1;

        return of(null).pipe(
          expand(() => {
            const chunkUrl = `${this.basePath}data/${baseName}_data${index}.json`;
            console.log('Trying chunk:', chunkUrl);
            return this.http.get<T[]>(chunkUrl).pipe(
              map((chunk) => {
                index++;
                return chunk;
              }),
              catchError(() => of(null))
            );
          }),
          takeWhile((chunk) => chunk !== null),
          reduce((all, chunk) => all.concat(chunk!), [] as T[])
        );
      })
    );
  }
}
