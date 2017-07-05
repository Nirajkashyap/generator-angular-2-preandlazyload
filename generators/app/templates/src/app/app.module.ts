import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  NgModule,  ApplicationRef} from '@angular/core';
import {  removeNgStyles,  createNewHosts,  createInputTransfer} from '@angularclass/hmr';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';


// Application wide providers

import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';


const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];


type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// brodcaster 
import { AppBroadcaster } from './app.broadcaster';

// App is our top level component
import { AppComponent } from './app.component';

// if using scss scss loader sample scss file are below if you are using
import '../styles/index.scss';

import '../styles/index.css';
// if you are using less loader sample less file are below
// import '../styles/index.less';

<% if (bootstrap) { %>

import 'bootstrap/dist/js/bootstrap';

<% } else { %>

<% } %>


import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { AppHttpInterceptor } from './app.interceptor';

import { TranslateService } from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  let url = 'http://' + window.location.host + '/assets/i18n/';
  console.log(url);
  return new TranslateHttpLoader(http, url);
}
// Routing config
import { RouterModule, Routes, Router,PreloadAllModules} from '@angular/router';


import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CanActivateGuard } from './can-activate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

// import { AppRoutingModule } from './app.routes';

// adding common(root level) component andadding in delcartion for Angular2
import { headerComponent } from './components/header'
//CMP-level component from generator


//PAGE-level component from generator
import { HomeComponent } from './pages/home';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'hreos/123',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [CanActivateGuard],
    component: headerComponent    
  },
  {
    path: 'prelazy',
    // canDeactivate: [CanDeactivateGuard],
    // canActivate: [CanActivateGuard],
    loadChildren: './modules/prelazy/index#PreLazyModule',
    data: { preload: true },
    // canLoad: [CanActivateGuard], // this will override preloadingStrategy
  },
  {
    path: 'lazy',
    // canDeactivate: [CanDeactivateGuard],
    // canActivate: [CanActivateGuard],
    loadChildren: './modules/lazy/index#LazyModule',
    data: { preload: false },
    // canLoad: [CanActivateGuard], // this will override preloadingStrategy
  },
   {
    path: 'protectedlazy',
    // canDeactivate: [CanDeactivateGuard],
    // canActivate: [CanActivateGuard],
    loadChildren: './modules/protectedlazy/index#ProtectedLazyModule',
    data: { preload: false },
    canLoad: [CanActivateGuard], // this will override preloadingStrategy 
  },
//ROUTE genenration pathsyntax
  {
  path: '**',  
  redirectTo : ''
  }
];
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    //AppRoutingModule
    RouterModule.forRoot(
      appRoutes,
      { useHash: true,preloadingStrategy: SelectivePreloadingStrategy }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  declarations: [
    AppComponent,
    //CMP-level component_declaration from generator
    HomeComponent,
    //PAGE-level component_declaration from generator
    //root level component
    headerComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AppBroadcaster,
    TranslateService,
    // AppRoutingModule providers
    AuthService,
    CanDeactivateGuard,
    CanActivateGuard,
    SelectivePreloadingStrategy,
    {
      provide: Http,
      useFactory:
      (backend: XHRBackend, defaultOptions: RequestOptions, router) => {
        //console.log(router);
        return new AppHttpInterceptor(backend, defaultOptions, router);
      },
      deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
    public translate: TranslateService
  ) { 
     
     translate.setDefaultLang('en');
     // translate.use('en');
     translate.use('ru');
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
