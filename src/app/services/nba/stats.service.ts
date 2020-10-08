import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Player from '../../models/player/player';
import Team from '../../models/team/team';
import { PlayerProfile } from 'src/app/models/playerProfile/player-profile';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private baseURL = 'https://nba-players.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getTeams(): Observable<Team[]> {
    // Calling the API to get all the teams
    return this.httpClient.get(
      'https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json',
      { responseType: 'json' }
    ).pipe(
      // Mapping the json response to a Team variable
      map((response: any) =>
        response.map((item: any) =>
          new Team(item.teamId,
            item.teamName,
            item.abbreviation,
            item.location)
        )
      )
    );
  }

  // Getting the list of the teams so later we can add the correct team to the player
  async getPlayers(): Promise<Player[]> {
    const teamsList = await this.getTeams().toPromise();
    return this.httpClient.get(this.baseURL + '/players-stats/',
      { responseType: 'json' }
    ).pipe(
      // For the sake of simplicity I limited the players to 5
      // Mapping the json response to a Player variable
      map((response: any) => response.slice(0, 5).map((item: any) =>
        new Player(
          item.name.split(' ')[0],
          item.name.split(' ')[1],
          teamsList.find(team => team.abbreviation === item.team_acronym.toUpperCase())
        )
      ))
    ).toPromise();
  }

  // API call to get more concrete data of a single player
  getSinglePlayer(playerName, playerLastName): Observable<PlayerProfile> {
    return this.httpClient.get(this.baseURL + '/players-stats/' + playerLastName + '/' + playerName,
      { responseType: 'json' }
    ).pipe(
      // Mapping the json response to a PlayerProfile variable
      map((response: any) =>
        new PlayerProfile(
          response.name,
          response.team_name,
          response.games_played,
          response.minutes_per_game,
          response.points_per_game,
          response.assists_per_game,
          this.baseURL + '/players/' + playerLastName + '/' + playerName
        ))
    );

  }

}
