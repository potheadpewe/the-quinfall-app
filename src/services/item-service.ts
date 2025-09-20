import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, expand, Observable, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private basePath = document.querySelector('base')?.getAttribute('href') || '/';

  constructor(private http: HttpClient) {}

  loadAllChunks<T>(baseName: string): Observable<T[]> {
    let index = 1;
    let firstFileTried = false;

    return of(null).pipe(
      expand(() => {
        let fileName: string;

        // First try the singular file, e.g. items_data.json
        if (!firstFileTried) {
          fileName = `${baseName}_data.json`;
          firstFileTried = true;
        } else {
          // Then try the numbered chunks: items_data1.json, items_data2.json...
          fileName = `${baseName}_data${index}.json`;
          index++;
        }

        const url = `${this.basePath}data/${fileName}`;
        console.log(`Loading: ${url}`);

        return this.http.get<T[]>(url).pipe(
          catchError(() => of(null))  // Stop when file doesn't exist
        );
      }),
      takeWhile((data) => data !== null),
      reduce((all, chunk) => all.concat(chunk!), [] as T[])
    );
  }
}
