import {
  Component,
  OnInit
} from '@angular/core';




@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'nglazyheader',  // <ngheader></ngheader>
  // We need to tell Angular's Dependency Injection which providers are in our app.

  // Our list of styles in our component. We may add more to compose many styles together
  // styleUrls: [ './header.component.css' ],
  styles: [
    require('./header.component.css')
  ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public headervalue = "header";
  // TypeScript public modifiers
  constructor() { }

  public ngOnInit() {
    console.log('hello `header` component');

  }

  public submitState(value: string) {
    console.log('submited value from fn argument', value);
    console.log(this.headervalue);

  }
}
