import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { TeamItem } from '../../models/team.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent {
  teams: TeamItem[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams() {
    this.teamService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }
}
