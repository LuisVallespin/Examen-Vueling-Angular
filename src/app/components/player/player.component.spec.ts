import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { StatsService } from 'src/app/services/nba/stats.service';
import { Observable, of } from 'rxjs';
import { PlayerProfile } from 'src/app/models/playerProfile/player-profile';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let playerProfile: PlayerProfile;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      providers: [StatsService],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    playerProfile = new PlayerProfile(
      'Mock Name',
      'Mock Team',
      '23',
      '52',
      '17',
      '9',
      'mockUrl',
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initializes de component and executes the service method getSinglePlayer() correctly', fakeAsync(() => {
    const service = TestBed.inject(StatsService);

    spyOn(service, 'getSinglePlayer').and.callFake((): Observable<PlayerProfile> => {
      return of(playerProfile);
    });

    component.ngOnInit();
    tick();

    expect(service.getSinglePlayer).toHaveBeenCalled();
    expect(component.playerProfile).toBe(playerProfile);
  }));
});
