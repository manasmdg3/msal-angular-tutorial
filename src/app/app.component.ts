import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest, EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'msal-angular-tutorial';
  activeUser: string | undefined = "Unknown user";
  isAuthenticated: boolean = false;
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
  private broadcastService: MsalBroadcastService, 
  private msalService: MsalService,
  private http: HttpClient) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.broadcastService.msalSubject$
		.pipe(
			filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
			takeUntil(this._destroying$)
		)
		.subscribe(msalEvent => {
      // Do something with event payload here
      const totalPayload = msalEvent.payload;
      console.log('totalPayload:: ', totalPayload);
      const accessToken = msalEvent.payload['accessToken'];
      console.log('accessToken:: ', accessToken);
      const idTokenClaims = msalEvent.payload['idTokenClaims'];
      console.log('idTokenClaims:: ', idTokenClaims);
      const idToken = msalEvent.payload['idToken'];
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('idToken', idToken);
      console.log('idToken:: ', idToken);
      console.log('inside app.component, broadcastService.msalSubject$:: ',this.msalService);
      this.setAuthenticationStatus();
      this.setLoginDisplay();
		});

    this.broadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None),
      takeUntil(this._destroying$)
    )
    .subscribe(() => {
      console.log('inside app.component',this.msalService);
      console.log('showing info: Name: ',this.msalService.instance.getActiveAccount()[0]['name']);
      sessionStorage.setItem('msalService', this.msalService.instance.getActiveAccount()[0]['name']);
      this.setAuthenticationStatus();
      this.setLoginDisplay();
    })
  }

  login() {
    if (this.msalGuardConfig.authRequest){
      this.msalService.loginRedirect({scopes: ["Directory.Read.All"],...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.msalService.loginRedirect();
    }
  }

  logout() { // Add log out function here
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  setAuthenticationStatus(): void {
    let activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
      activeAccount = this.msalService.instance.getAllAccounts()[0];
      this.msalService.instance.setActiveAccount(activeAccount); 
    }
    this.isAuthenticated = !!activeAccount;
    this.activeUser = activeAccount?.username;
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}