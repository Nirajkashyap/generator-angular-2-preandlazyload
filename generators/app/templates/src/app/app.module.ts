import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';

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


// Routing config
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';


// App is our top level component
import { AppComponent } from './app.component';

import '../styles/index.css';

// if using scss scss loader sample scss file are below if you are using
import '../styles/index.scss';
// if you are using less loader sample less file are below
//import '../styles/index.less';

// if you are using bootstrap css
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// if you are using less and want to inlcue bootsrrap less
//import '../../node_modules/bootstrap/less/bootstrap.less';


// import 'jquery/dist/jquery'; // not need as we have provided in global level via wbepack
// but it will be not avilable to browser console as include as Closures
import 'bootstrap/dist/js/bootstrap';

import { AppRoutingModule } from './app.routes';

// adding common(root level) component andadding in delcartion for Angular2
import { headerComponent } from './components/header'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    headerComponent
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

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
