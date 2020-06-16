import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlFactory } from '@valueadd/typed-urls';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExternalRadio } from '../models/external-radio.model';

@Injectable({
  providedIn: 'root',
})
export class ExternalRadioService {
  private _externalRadios = new BehaviorSubject([]);
  private _selectedExternalRadio = new BehaviorSubject<ExternalRadio>(null);
  externalRadios$ = this._externalRadios.asObservable();
  selectedExternalRadio$ = this._selectedExternalRadio.asObservable();

  private endpoints = {
    getAll: urlFactory('/api/external-radio'),
    select: urlFactory<'id'>('/api/user/external-radio/:id', true),
  };

  constructor(private http: HttpClient) {}

  getAll(): void {
    this.http
      .get<ExternalRadio[]>(this.endpoints.getAll.url())
      .pipe(tap((radios) => this._externalRadios.next(radios)))
      .subscribe();
  }

  select(externalRadio: ExternalRadio): void {
    this._selectedExternalRadio.next(externalRadio);
    this.http
      .put<void>(this.endpoints.select.url({ id: externalRadio.id }), null)
      .subscribe();
  }
}
