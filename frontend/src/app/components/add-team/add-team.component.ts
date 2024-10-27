import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { NgFor, NgIf } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { TeamService } from '../../services/team.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css',
})
export class AddTeamComponent {
  team: any = {
    user_id: 1,
    team_name: '',
    pokemon_ids: [],
  };

  availablePokemons: Pokemon[] = [];
  selectedPokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    // Fetch available Pokémon list
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.availablePokemons = pokemons;
      console.log(pokemons);
    });
  }

  selectPokemon(pokemon: Pokemon) {
    if (this.selectedPokemons.length < 6) {
      this.selectedPokemons.push(pokemon);
    }
  }

  removePokemon(pokemon: Pokemon) {
    this.selectedPokemons = this.selectedPokemons.filter(
      (p) => p.id !== pokemon.id
    );
  }

  clearSelectedPokemons() {
    this.selectedPokemons = [];
  }

  submitForm() {
    if (this.selectedPokemons.length === 6) {
      this.team.pokemon_ids = this.selectedPokemons.map((p) => p.id);
      this.teamService.addTeam(this.team).subscribe((response) => {
        console.log('Team added successfully', response);
      });
    } else {
      alert('Please select exactly 6 Pokémon.');
    }
  }
}
