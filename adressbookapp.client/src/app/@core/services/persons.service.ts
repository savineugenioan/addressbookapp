// people.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})

export class PersonsService {
  baseUrl: string;

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this.baseUrl = baseUrl;
	}

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}api/persons`);
  }
}
