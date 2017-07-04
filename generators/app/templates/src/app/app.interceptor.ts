import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

// import * as $ from 'jquery';

@Injectable()
export class AppHttpInterceptor extends Http {
  public router;
  public cookieUtil;
  public serviceurl;
  public requestcounter = 0;
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, router: Router) {
    super(backend, defaultOptions);
    this.router = router;    
    this.serviceurl = 'http://github.com/api/'
  }

  /*
    * Build API url.
    * @param url
    * @returns {string}
  */
  private getFullUrl(url: string): string {
    // use 1 to mock up all service from assets data
    if (url.indexOf('http://') > -1) {
      return url;
    } else {
      return this.serviceurl + url;
    }

  }

  /*
    * Request options.
    * @param options
    * @returns {RequestOptionsArgs}
    */
  private requestOptions(url: any, options?: RequestOptionsArgs): RequestOptionsArgs {
    
    this.requestcounter++;
    
    if (this.requestcounter > 0) {
            // show loader
    }
    if (!options) {
      options = new RequestOptions();
    }

    if (!options.headers) {
      options.headers = new Headers();
    }
    
    // set custom token
    options.headers.set('Authorization','customtoken' );
    return options;
  }


  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(this.getFullUrl(url), this.requestOptions(url, options))
      .do((res: Response) => {
        this.onSubscribeSuccess(res, url);
      }, (error: any) => {
        this.onSubscribeError(error);
      });
  }

  // Implement POST, PUT, DELETE HERE

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return super.post(this.getFullUrl(url), body, this.requestOptions(url, options))
      .do((res: Response) => {
        this.onSubscribeSuccess(res, url);
      }, (error: any) => {
        this.onSubscribeError(error);
      });
  }
  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return super.put(this.getFullUrl(url), body, this.requestOptions(url, options))
      .do((res: Response) => {
        this.onSubscribeSuccess(res, url);
      }, (error: any) => {
        this.onSubscribeError(error);
      });
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.delete(this.getFullUrl(url), this.requestOptions(url, options))
      .do((res: Response) => {
        this.onSubscribeSuccess(res, url);
      }, (error: any) => {
        this.onSubscribeError(error);
      });
  }

  private onSubscribeSuccess(res: Response, url: any): any {   
    this.requestcounter--;    
    if (this.requestcounter === 0) {
      // hide loader
      // $('.app-outer-container').css('display', 'none');
    }
    return res;
  }
  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
    this.requestcounter--;
    if (this.requestcounter === 0) {
      // hide loader
      // $('.app-outer-container').css('display', 'none');
    }      
    // this.router.navigate(['login'], { queryParams: { redirect_uri: window.location.href.split('#')[1] } });
  }

}
