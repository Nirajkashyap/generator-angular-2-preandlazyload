import {
  Component,
  OnInit
} from '@angular/core';

<% if (pageservice) { %>
import { <%= pagename %>Service } from './<%= pagename %>.service';
<% } else { %>
<% } %>

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'header'
   */
  selector: 'ng<%= pagename %>',

  /**
   * Our list of styles in our component. We may add more to compose many styles together
   */
  // styles and styleUrls both will inject style tag in head for component view is general i.e encapsulation: ViewEncapsulation.None
  // styleUrls not working for absoluate url - for node_modules
  
  //styleUrls: [ './<%= pagename %>.component.css' ],
  styles: [
    require('./<%= pagename %>.component.css')    
  ],
 

  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler
   */
  templateUrl: './<%= pagename %>.component.html'<% if (pageservice) { %>,
  providers: [<%= pagename %>Service]
  <% } else { %>
<% } %>
})
export class <%= pagename %>Component implements OnInit {

  constructor(<% if (pageservice) { %>  private <%= pagename %>Service : <%= pagename %>Service  <% } else { %> <% } %>) {}

  public ngOnInit() {
    console.log('hello `<%= pagename %>` component');
  }
}
