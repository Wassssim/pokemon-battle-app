import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AdjustPokemonComponent } from './components/adjust-pokemon/adjust-pokemon.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { BattleComponent } from './components/battle/battle.component';
import { TeamSelectionComponent } from './components/team-selection/team-selection.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'team-selection', component: TeamSelectionComponent },
  { path: 'battle/:team1Id/:team2Id', component: BattleComponent },
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'edit-pokemon/:id', component: AdjustPokemonComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: '**', redirectTo: '/pokemons' },
];
