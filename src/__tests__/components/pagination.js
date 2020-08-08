/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { BodyContext } from '../../App';
import PaginationComponent from '../../components/pagination/pagination';

describe('pagination', () => {
  let wrapper;
  const TestContext = BodyContext;
  const Testvalues = {
    page: 1,
    handlePaginationChange : jest.fn(),
  };
  beforeEach(() => {
    wrapper = mount(
      <TestContext.Provider value={Testvalues}>
        <PaginationComponent />
      </TestContext.Provider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

});
