import { Inject, InjectionToken, NgModule } from '@angular/core';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
/* this is the mock data endpoint class */
import { endPointIndex } from './sample/endpoint-index';
export var REAL_BACKEND = new InjectionToken('XHRBackend');
var MockHttpModule = (function () {
    function MockHttpModule(xhrMock, xhr) {
        this.xhrMock = xhrMock;
        var mockBackend = xhrMock;
        mockBackend.connections.subscribe(function (connection) {
            var match = false;
            for (var _i = 0, endPointIndex_1 = endPointIndex; _i < endPointIndex_1.length; _i++) {
                var fixture = endPointIndex_1[_i];
                if (fixture.regex.test(connection.request.url) && connection.request.method === fixture.method) {
                    match = true;
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: typeof fixture.value === 'object' ? JSON.stringify(fixture.value) : fixture.value
                    })));
                }
            }
            if (!match) {
                var xhrConnection = xhr.createConnection(connection.request);
                xhrConnection.response.subscribe(function (response) {
                    connection.mockRespond(response);
                }, function (error) {
                    connection.mockError(error);
                });
            }
        });
    }
    return MockHttpModule;
}());
export { MockHttpModule };
MockHttpModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    HttpModule
                ],
                /*  inject an instance of MockBackend whenever someone asks for an XHRBackend */
                providers: [
                    { provide: REAL_BACKEND, useClass: XHRBackend },
                    { provide: XHRBackend, useClass: MockBackend }
                ]
            },] },
];
/** @nocollapse */
MockHttpModule.ctorParameters = function () { return [
    { type: XHRBackend, },
    { type: XHRBackend, decorators: [{ type: Inject, args: [REAL_BACKEND,] },] },
]; };
//# sourceMappingURL=mock.module.js.map