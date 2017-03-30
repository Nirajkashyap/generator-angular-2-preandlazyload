import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// base model for route object
import { Routeobj } from './app.routeobj';

import { HomeComponent } from './pages/home';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})

@Injectable()
export class AppRoutingModule {

  public value = 'Angular 2';

  constructor(
    public http: Http
  ) {
    this.getRoutes();
  }


  public getRoutes(): Observable<Routeobj[]> {
    console.log("res......")
    return this.http.get('/app.routes.json')
      .map(this.extractData);
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("receving data");
    console.log(res);
    let body = res.json();
    return body.data || {};
  }

  private handleError(error) {
    // In a real world app, we might use a remote logging infrastructure

  }


}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/