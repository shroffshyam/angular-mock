import {Inject, InjectionToken, NgModule} from '@angular/core';
import {HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
/* this is the mock data endpoint class */
import {endPointIndex} from './sample/endpoint-index';

export let REAL_BACKEND = new InjectionToken<XHRBackend>('XHRBackend');

@NgModule({
  imports: [
    HttpModule
  ],
  /*  inject an instance of MockBackend whenever someone asks for an XHRBackend */
  providers: [
    {provide: REAL_BACKEND, useClass: XHRBackend},
    {provide: XHRBackend, useClass: MockBackend}
  ]
})
export class MockHttpModule {
  constructor(private xhrMock: XHRBackend, @Inject(REAL_BACKEND) xhr: XHRBackend) {
    const mockBackend: any = xhrMock;

    mockBackend.connections.subscribe((connection) => {
      let match = false;

      for (const fixture of endPointIndex) {
        if (fixture.regex.test(connection.request.url) && connection.request.method === fixture.method) {
          match = true;
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body:  typeof fixture.value === 'object' ? JSON.stringify(fixture.value) : fixture.value
          })));
        }
      }

      if (!match) {
        const xhrConnection = xhr.createConnection(connection.request);
        xhrConnection.response.subscribe((response) => {
            connection.mockRespond(response);
          },
          (error : any) => {
              connection.mockError(error);
          }
        );
      }

    });
  }
}
