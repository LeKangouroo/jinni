import webdriver from 'selenium-webdriver';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const builder = new webdriver.Builder()
  .forBrowser('firefox');

const driver = builder.build();
const By = webdriver.By;
const until = webdriver.until;

describe('A Hello World test suite', () => {

  it('opens Google Search homepage', (done) => {

    driver.get('https://google.fr');
    driver.wait(until.elementLocated(By.css('body')), 10000);
    driver.getTitle().then(

      (title) => {
        expect(title).toBe('Google');
        done();
      },
      (err) => {
        done.fail(err);
      }
    );
  });

  it('types "Hello world" in the search input', () => {

    const input = driver.findElement(By.name('q'));

    input.sendKeys('Hello world');
  });
});
