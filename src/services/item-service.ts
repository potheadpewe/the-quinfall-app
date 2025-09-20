import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, expand, map, Observable, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';

  constructor(private http: HttpClient) {}

  loadAllChunks<T>(baseName: string): Observable<T[]> {
    const baseUrl = `${this.basePath}data/`;

    // Try the singular file first (e.g., baseName_data.json)
    const singularUrl = `${baseUrl}${baseName}_data.json`;

    return this.http.get<T[]>(singularUrl).pipe(
      // If singular file exists, return it
      catchError(() => {
        // If singular file not found, try chunked files starting from index 1
        return of(1).pipe(
          expand(index => {
            const chunkUrl = `${baseUrl}${baseName}_data${index}.json`;
            console.log('Trying chunk:', chunkUrl);
            return this.http.get<T[]>(chunkUrl).pipe(
              map(chunk => ({ index: index + 1, chunk })),
              catchError(() => EMPTY) // stop if file not found
            );
          }),
          map(({ chunk }) => chunk),
          reduce((all, chunk) => all.concat(chunk), [] as T[])
        );
      })
    );
  }
}
