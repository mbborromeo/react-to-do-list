import React from 'react';
import axios from 'axios-jsonp-pro';
import List from './List'
import { StaticRouter } from 'react-router-dom'
import { render, wait, waitForElementToBeRemoved, screen } from '@testing-library/react';
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
    /*
    await wait(
      () => expect(screen.getByText('Item 2')).toBeInTheDocument()
    );
    */

    // Delete item 2
    // wait - keeps trying to click an element with label until it succeeds (or timeout is reached)
    await wait(
      () => userEvent.click(
        screen.getByLabelText('Delete item 2')
      )
    );
    
    await waitForElementToBeRemoved(
      () => {
        expect(screen.getByText('Item 2')).toBeInTheDocument()
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
      }
    );
  })
})