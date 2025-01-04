import { Page } from '@playwright/test';

export class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://todomvc.com/examples/react/dist/');
  }

  get newTodoInput() {
    return this.page.locator('.new-todo');
  }
}
