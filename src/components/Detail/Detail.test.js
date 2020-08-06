import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import axios from 'axios-jsonp-pro';
import DataService from '../../services/DataService';
import Detail from './Detail';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders item data", async () => {
  const fakeItem = {
    title: "Test Item",
    id: "223",
    completed: false
  };

  jest.spyOn(axios, "jsonp").mockImplementation( () =>
    Promise.resolve({
      json: () => Promise.resolve( fakeItem )
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Detail match={{ params: { id: "223" } }} />, container);
  });

  expect(container.querySelector("#id").textContent).toBe( 'ID: ' + fakeItem.id );
  expect(container.querySelector("#title").textContent).toBe( 'Title: ' + fakeItem.title );
  expect(container.querySelector("#completed").textContent).toBe( 'Completed: ' + fakeItem.completed.toString() );
  //expect(container.textContent).toContain( fakeItem.address );

  // remove the mock to ensure tests are completely isolated
  axios.jsonp.mockRestore();
});