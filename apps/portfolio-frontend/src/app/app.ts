import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationComponent } from './components/notification/notification.component';

@Component({
  imports: [RouterModule, HeaderComponent, FooterComponent, NotificationComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'portfolio-frontend';
}
