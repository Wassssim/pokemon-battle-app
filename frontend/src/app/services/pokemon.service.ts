import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'http://localhost:5000/api/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}`);
  }

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }

  updatePokemon(id: string, pokemonData: Partial<Pokemon>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pokemonData);
  }
}
