import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';

class CustomWorld {
  browser: Browser | undefined;
  page: Page | undefined;
}

setWorldConstructor(CustomWorld);

Before(async function(this: CustomWorld) {
  this.browser = await chromium.launch({ headless: false });
  this.page = await this.browser.newPage();
});

After(async function(this: CustomWorld) {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});
