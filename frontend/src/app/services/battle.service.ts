import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  private apiUrl = 'http://localhost:5000/api/battle';

  constructor(private http: HttpClient) {}

  battle(team1Id: number, team2Id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { team1Id, team2Id });
  }
}
