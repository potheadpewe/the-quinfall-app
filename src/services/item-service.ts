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
        return of(1).pipe(
          expand(index => {
            const chunkUrl = `${baseUrl}${baseName}_data${index}.json`;
            return this.http.get<T[]>(chunkUrl).pipe(
              tap(chunk => {
                allChunks = allChunks.concat(chunk);
              }),
              map(() => index + 1),
              catchError(() => EMPTY)  // Silently stop on 404 or error
            );
          }),
          last(),
          map(() => allChunks)
        );
      }),
      catchError(() => of([])) // If singular fetch fails and chunks fail, return empty array silently
    );
  }
}
