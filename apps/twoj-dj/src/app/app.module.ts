import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { AwesomePlayerComponent } from './components/awesome-player/awesome-player.component';
import { ExternalRadioSelectionDialogComponent } from './components/external-radio-selection-dialog/external-radio-selection-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoomsMenuComponent } from './components/rooms-menu/rooms-menu.component';
import { RadioComponent } from './containers/radio/radio.component';

const routes: Route[] = [{ path: 'room/:roomId', component: RadioComponent }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoomsMenuComponent,
    ActionMenuComponent,
    ExternalRadioSelectionDialogComponent,
    AwesomePlayerComponent,
    RadioComponent,
    LoaderComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
