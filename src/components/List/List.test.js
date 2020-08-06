import React from 'react';
import axios from 'axios-jsonp-pro';
import List from './List'
import { StaticRouter } from 'react-router-dom'
import { render, wait, waitFor, waitForElementToBeRemoved, queryByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('List', () => {
  it('allows adding an item', async () => {
    // Mock jsonp to return canned data
    jest.spyOn(axios, 'jsonp');
    axios.jsonp.mockResolvedValue([
      {
        id: 1,
        title: 'Item 1',
        completed: false
      },
      {
        id: 2,
        title: 'Item 2',
        completed: true
      }
    ]);

    render(
      <StaticRouter>
        <List />
      </StaticRouter>
    );

    // Make sure loading indicator comes up first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for items to load and display
    await wait(
      () => expect(screen.getByText('Item 1')).toBeInTheDocument()
    );

    // Complete the form
    await userEvent.type(
      screen.getByPlaceholderText('Type item'),
      'New item'
    );
    await userEvent.click(
      screen.getByRole('button', {name: 'Add'})
    );

    // Check that the item input clears and that the new item shows up
    await wait(
      () => expect(screen.getByPlaceholderText('Type item')).toHaveProperty('value', '')
    );
    await wait(
      () => expect(screen.getByText('New item')).toBeInTheDocument()
    );
  })

  it('allows deleting an item', async () => {
    jest.spyOn(axios, 'jsonp');
    axios.jsonp.mockResolvedValue([
      {
        id: 1,
        title: 'Item 1',
        completed: false
      },
      {
        id: 2,
        title: 'Item 2',
        completed: true
      }
    ]);

    render(
      <StaticRouter>
        <List />
      </StaticRouter>
    );

    // Make sure loading indicator comes up first
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for items to load and display
    await wait(
      () => expect(screen.getByText('Item 2')).toBeInTheDocument()
    );

    // Delete item 2
    // wait - keeps trying to click an element with label until it succeeds (or timeout is reached)
    await wait(
      () => userEvent.click(
        screen.getByLabelText('Delete item 2')
      )
    );
    
    //await waitForElementToBeRemoved(
    await waitFor(
      // Error: Unable to find an element with the text: Item 2. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
      // () => expect(screen.getByText('Item 2')).not.toBeInTheDocument() 
      
      // NOTE: use queryBy instead of getBy to return null instead of throwing in the query itself

      // TypeError: container.querySelectorAll is not a function
      // () => queryByText('Item 2')
      // () => queryByText(/item 2/i)

      // () => findByText('Item 2')

      // Error: The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.
      // () => screen.queryByText('Item 2')

      // TypeError: Cannot read property 'not' of null
      // () => screen.queryByText('Item 2').not.toBeInTheDocument()

      // Error: Timed out in waitForElementToBeRemoved.
      // () => expect(screen.queryByText('Item 2'))
      
      // Error: The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.
      // New Error after using waitFor:  Warning: An update to List inside a test was not wrapped in act(...)
      () => expect(screen.queryByText('Item 2')).not.toBeInTheDocument() 

      // Error: The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.
      // () => {
      //   expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
      // }   

      // Error: The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.
      // () => {
      //   const item2title = screen.queryByText('Item 2')
      //   expect(item2title).toBeNull() // it doesn't exist
      // }
    );
    
  })
})