import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, defer, EMPTY, expand, last, map, Observable, of, reduce, takeWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';

  constructor(private http: HttpClient) {}

  loadAllChunks<T>(baseName: string): Observable<T[]> {
    const baseUrl = `${this.basePath}data/`;
    const singularUrl = `${baseUrl}${baseName}_data.json`;

    return this.http.get<T[]>(singularUrl).pipe(
      catchError(() => {
        let allChunks: T[] = [];

        return of(1).pipe( // Start with chunk index 1
          expand(index => {
            const chunkUrl = `${baseUrl}${baseName}_data${index}.json`;
            console.log('Trying chunk:', chunkUrl);

            return this.http.get<T[]>(chunkUrl).pipe(
              tap(chunk => {
                allChunks = allChunks.concat(chunk);
              }),
              map(() => index + 1), // Emit next index number for expand
              catchError(() => EMPTY) // Stop expanding when chunk not found
            );
          }),
          last(), // Wait until expand completes
          map(() => allChunks) // Emit all loaded chunks concatenated
        );
      })
    );
  }
}
