import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';
import { SimpleComponent } from './simple/simple.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/simple',
    pathMatch: 'full'
  },
  {
    path: 'angular-help',
    component: AngularHelpComponent
  },
  {
    path: 'simple',
    component: SimpleComponent
  },
  {
    path: 'minesweeper',
    component: MinesweeperComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
