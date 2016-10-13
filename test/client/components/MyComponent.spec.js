import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MyComponent from '../../../client/components/MyComponent';

describe('<MyComponent />', () => {
  let wrapper;
  beforeEach('Setup MyComponent wrapper', () => {
    wrapper = shallow(
      <MyComponent title="Hello World!" />
    );
  });
  it('should render the title', () => {
    expect(wrapper.find('h2').text()).to.equal('Hello World!');
  });
});
