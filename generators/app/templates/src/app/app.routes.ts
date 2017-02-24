import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CanDeactivateGuard }       from './can-deactivate-guard.service';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { HomeComponent } from './home/home.component';

// Observable Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Routeobj } from './app.routeobj';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent    
  }, 
  {
    path: 'preload',
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { preload: false }    
  },
  {
    path: 'lazyloadwithcanload',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
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
    this.getHeroes();
  }

  // public getData() {
  //   console.log('Title#getData(): Get Data');
  //   return this.http.get('/app.routes.json')
  //   .map(this.extractData)
  //   //.map(res => res.json());
  //   // return {
  //   //   value: 'AngularClass'
  //   // };
  // }

  getHeroes (): Observable<Routeobj[]> {
    console.log("res......")
    return this.http.get('/app.routes.json')
                    .map(this.extractData);
                    //.catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("res...receivedls");
    console.log(res);
    let body = res.json();
    return body.data || { };
  }


}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/