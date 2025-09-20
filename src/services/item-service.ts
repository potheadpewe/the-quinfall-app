import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { catchError, expand, map, Observable, of, reduce, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private getBaseHref(): string {
    const base = this.document.getElementsByTagName('base')[0].getAttribute('href') || '/';
    return base.endsWith('/') ? base : base + '/';
  }

  getJsonFile<T = any>(filename: string): Observable<T> {
    const baseHref = this.getBaseHref();
    return this.http.get<T>(`${baseHref}data/${filename}`);
  }

  loadAllChunks<T>(baseName: string): Observable<T[]> {
    const baseHref = this.getBaseHref();
    let index = 1;
    return of(null).pipe(
      expand(() => {
        const fileName =
          index === 1 ? `${baseName}_data.json` : `${baseName}_data${index}.json`;
        return this.http.get<T[]>(`${baseHref}data/${fileName}`).pipe(
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
