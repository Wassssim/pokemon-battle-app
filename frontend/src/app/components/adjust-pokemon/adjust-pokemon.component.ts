import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-adjust-pokemon',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './adjust-pokemon.component.html',
  styleUrl: './adjust-pokemon.component.css',
})
export class AdjustPokemonComponent {
  pokemon: Pokemon = {
    id: '0',
    type: '',
    life: 0,
    power: 0,
    image: '',
    name: '',
  };
  message: string = '';

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.pokemonService.getPokemon(params['id']).subscribe((data) => {
        this.pokemon = data;
      });
    });
  }

  submitForm() {
    this.pokemonService
      .updatePokemon(this.pokemon.id, this.pokemon)
      .subscribe(() => {
        this.resetForm();
        this.router.navigate(['/pokemons']);
      });
  }

  resetForm() {
    this.pokemon = { ...this.pokemon, id: '0', type: '', life: 0, power: 0 };
  }
}
