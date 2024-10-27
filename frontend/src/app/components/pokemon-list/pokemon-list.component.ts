import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokemons: Pokemon[] = [];
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons() {
    this.pokemonService
      .getPokemons()
      .subscribe((data) => (this.pokemons = data));
  }

  editPokemon(id: string) {
    this.router.navigate(['/edit-pokemon', id]);
  }
}
