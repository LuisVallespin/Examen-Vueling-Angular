import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatsService } from '../../services/nba/stats.service';
import { PlayerProfile } from 'src/app/models/playerProfile/player-profile';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playerName: string;
  playerLastName: string;
  playerProfile: PlayerProfile;
  exception: boolean;

  constructor(private route: ActivatedRoute, private statsService: StatsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.playerName = this.data.name;
    this.playerLastName = this.data.lastName;

    // Retrieven the Player from the API
    this.statsService.getSinglePlayer(this.playerName, this.playerLastName)
      .subscribe(
        result => this.playerProfile = result,
        error => this.exception = true
      );
  }


}
