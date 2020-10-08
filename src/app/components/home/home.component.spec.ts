import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { StatsService } from 'src/app/services/nba/stats.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import Player from '../../models/player/player';
import Team from 'src/app/models/team/team';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let players: Player[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [StatsService],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    players = [
      new Player('Player 1', 'Mock', new Team(0, 'Mock Team 1', 'mt1', 'Mock City 1')),
      new Player('Player 2', 'Mock', new Team(0, 'Mock Team 2', 'mt2', 'Mock City 2'))
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initializes the component and executes the service method getPlayers() correctly', fakeAsync(() => {
    const service = TestBed.inject(StatsService);

    service.getPlayers = () => {
      return Promise.resolve(players);
    };

    spyOn(service, 'getPlayers').and.callThrough();
    component.ngOnInit();
    tick();

    expect(service.getPlayers).toHaveBeenCalled();
    expect(component.players).toBe(players);
  }));
});
