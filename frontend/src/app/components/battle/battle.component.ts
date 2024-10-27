import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { TeamService } from '../../services/team.service';
import { NgFor, NgIf } from '@angular/common';
import { BattleService } from '../../services/battle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.css',
})
export class BattleComponent {
  team1Pokemons: any[] = [];
  team2Pokemons: any[] = [];
  currentRound: number = 0;
  battleLog: any[] = [];
  winner: string | null = null;

  constructor(
    private battleService: BattleService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.route.params.subscribe((params) => {
      const team1Id = params['team1Id'];
      const team2Id = params['team2Id'];

      this.teamService.getTeamPokemons(team1Id).subscribe((data) => {
        this.team1Pokemons = data;
        this.startBattle(team1Id, team2Id);
      });

      this.teamService.getTeamPokemons(team2Id).subscribe((data) => {
        this.team2Pokemons = data;
      });
    });
  }

  startBattle(team1Id: number, team2Id: number) {
    this.battleService.battle(team1Id, team2Id).subscribe((log) => {
      this.battleLog = log;
      this.currentRound = 0;
      this.updateBattle();
      console.log(log);
    });
  }

  updateBattle() {
    if (this.currentRound < this.battleLog.length) {
      const currentLog = this.battleLog[this.currentRound];
      this.winner = currentLog.winner || null;
    }
  }

  nextRound() {
    if (this.currentRound < this.battleLog.length - 1) {
      this.currentRound++;
      this.updateBattle();
    }
  }

  previousRound() {
    if (this.currentRound > 0) {
      this.currentRound--;
      this.updateBattle();
    }
  }
}
