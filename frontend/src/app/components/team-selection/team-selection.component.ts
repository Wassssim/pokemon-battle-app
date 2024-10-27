import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Router } from '@angular/router';
import { TeamItem } from '../../models/team.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-team-selection',
  standalone: true,
  imports: [NgFor],
  templateUrl: './team-selection.component.html',
  styleUrl: './team-selection.component.css',
})
export class TeamSelectionComponent {
  teams: TeamItem[] = [];
  selectedTeam1Id: string | null = null;
  selectedTeam2Id: string | null = null;

  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }

  startBattle() {
    if (this.selectedTeam1Id && this.selectedTeam2Id) {
      this.router.navigate([
        `/battle/${this.selectedTeam1Id}/${this.selectedTeam2Id}`,
      ]);
    } else {
      alert('Please select two teams to start the battle.');
    }
  }
}
