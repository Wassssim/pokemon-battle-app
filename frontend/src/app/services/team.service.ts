import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:5000/api/teams';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addTeam(teamData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, teamData);
  }

  getTeamPokemons(teamId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/team/${teamId}/pokemons`);
  }
}
