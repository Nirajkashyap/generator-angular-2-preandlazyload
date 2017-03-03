import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'header'
   */
  selector: '<%= pagename %>',

  /**
   * Our list of styles in our component. We may add more to compose many styles together
   */
  // styles and styleUrls both will inject style tag in head for component view is general i.e encapsulation: ViewEncapsulation.None
  // styleUrls not working for absoluate url - for node_modules
  
  //styleUrls: [ './<%= pagename %>.component.less' ],
  styles: [
    require('./<%= pagename %>.component.less')    
  ],
 

  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler
   */
  templateUrl: './<%= pagename %>.component.html'
})
export class <%= pagename %>Component implements OnInit {

  constructor() {}

  public ngOnInit() {
    console.log('hello `<%= pagename %>` component');
  }
}
