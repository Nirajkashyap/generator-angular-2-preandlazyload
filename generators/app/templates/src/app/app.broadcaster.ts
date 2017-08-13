import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class AppBroadcaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  public broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  public on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter((event) => event.key === key)
      .map((event) => event.data);
  }
}
