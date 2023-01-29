import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { async, asyncScheduler } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log('inside home component: ', result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
      
        try {
          const token = this.msalService.acquireTokenSilent({
            scopes: ['User.Read','Directory.Read.All']
          });
          console.log('inside home component: ',token);
        } catch (err) {
          console.error(err);
        }
      
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }
}
function acquireToken() {
  throw new Error('Function not implemented.');
}

