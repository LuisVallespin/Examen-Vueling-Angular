import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/nba/stats.service';
import Player from '../../models/player/player';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { PlayerComponent } from '../player/player.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  players: Player[];
  color: ThemePalette = 'primary';
  exception: boolean;

  constructor(private statsService: StatsService, private router: Router, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    // Calling the API to get the list of players
    this.statsService.getPlayers().then(
      result => this.players = result,
      error => this.exception = true
    );
  }

  // Opens a Dialog and passes the data of the player selected
  openDialog(name, lastName): void {
    const dialogRef = this.dialog.open(PlayerComponent, {
      data: { name, lastName },
    });
  }

}
