import { InjectionToken } from '@angular/core';
import { XHRBackend } from '@angular/http';
export declare let REAL_BACKEND: InjectionToken<XHRBackend>;
export declare class MockHttpModule {
    private xhrMock;
    constructor(xhrMock: XHRBackend, xhr: XHRBackend);
}
