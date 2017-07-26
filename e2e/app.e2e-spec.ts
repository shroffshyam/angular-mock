import { AngularMockPage } from './app.po';

describe('angular-mock App', () => {
  let page: AngularMockPage;

  beforeEach(() => {
    page = new AngularMockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
