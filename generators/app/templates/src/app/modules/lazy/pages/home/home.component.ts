import {
  Component,
  OnInit
} from '@angular/core';

import { HomeService } from './home.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'nglazyhome',  // <nghome></nghome>
  // We need to tell Angular's Dependency Injection which providers are in our app.

  // Our list of styles in our component. We may add more to compose many styles together
  // styleUrls: [ './home.component.css' ],
  styles: [
    require('./home.component.css')
  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html',
  providers: [HomeService]
})
export class LazyHomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public homevalue = 'home';
  public DataResponseArray = [];
  public errorMessage
  // TypeScript public modifiers
  constructor(
    
    public homeService: HomeService

  ) { }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.homeService.getHeroes()
                     .subscribe(
                       heroes => {
                         this.DataResponseArray = heroes;
                       },
                       error => { 
                         this.errorMessage = <any>error
                       });

  }

  public submitState(value: string) {
    console.log('submited value from fn argument', value);
    console.log(this.homevalue);

  }
}
