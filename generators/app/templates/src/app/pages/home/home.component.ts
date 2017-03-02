import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  
  // Our list of styles in our component. We may add more to compose many styles together
  // styleUrls: [ './home.component.css' ],
  styles: [
    require('./home.component.css')    
  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public homevalue = "home";
  // TypeScript public modifiers
  constructor(
    public appState: AppState
    
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    
  }

  public submitState(value: string) {
    console.log('submited value from fn argument', value);
    console.log(this.homevalue);
    
  }
}
