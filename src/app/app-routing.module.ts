import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'player/:name/:lastName', component: PlayerComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
