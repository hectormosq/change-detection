import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleComponent } from './simple/simple.component';
import { AngularHelpComponent } from './angular-help/angular-help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatingPipe } from './simple/calculating.pipe';
import { MinesweeperModule } from './minesweeper/minesweeper.module';

@NgModule({
  declarations: [AppComponent, SimpleComponent, AngularHelpComponent, CalculatingPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatChipsModule,
    MinesweeperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
