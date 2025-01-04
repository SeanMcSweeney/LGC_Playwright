import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { TodoPage } from '../page_objects/todo_page';

let todoPage: TodoPage;
const today = new Date().toISOString().split('T')[0];
const todayTodo = `TODO 1 - ${today}`
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
const tomorrowTodo = `TODO 1 - ${tomorrow}`

Given('I am on the TodoMVC application', async function() {
  todoPage = new TodoPage(this.page);
  await todoPage.navigate();
});

Then('the url is correct', async function() {
  await expect(this.page).toHaveURL('https://todomvc.com/examples/react/dist/');
});

When('I add a TODO item with text TODO 1 - and today\'s date', async function() {
  await this.page.locator('#todo-input').fill(todayTodo);
  await this.page.locator('#todo-input').press('Enter');
});

When('I see TODO 1 - and today\'s date in the list', async function() {
  await expect(this.page.getByTestId('todo-list').getByText(todayTodo)).toBeVisible();
});

When('I add a TODO item with text TODO 2 - and tomorrow\'s date', async function() {
  await this.page.locator('#todo-input').fill(tomorrowTodo);
  await this.page.locator('#todo-input').press('Enter');
});

When('I mark TODO 1 - as completed', async function() {
  const todoItem = this.page.getByTestId('todo-list').getByText(todayTodo);
  await todoItem.locator('..').getByTestId('todo-item-toggle').click();
});

When('TODO 1 - is displayed as completed', async function() {
  const todoItem = this.page.getByTestId('todo-list').getByText(todayTodo);
  const checkbox = todoItem.locator('..').getByTestId('todo-item-toggle');
  const parentLi = todoItem.locator('xpath=ancestor::li[1]');
  await expect(checkbox).toBeChecked();
  await expect(parentLi).toHaveClass(/completed/);
  await expect(parentLi).toBeVisible();
});

When('I delete TODO 2 -', async function() {
  const todoItem = this.page.getByTestId('todo-list').getByText(tomorrowTodo);
  const deleteButton = todoItem.locator('..').getByTestId('todo-item-button');
  await todoItem.hover();
  await deleteButton.click();
});

Then('TODO 2 - should no longer be in the list', async function() {
  await expect(this.page.getByTestId('todo-list').getByText(tomorrowTodo)).not.toBeVisible();
});
