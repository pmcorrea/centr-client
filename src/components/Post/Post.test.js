import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Post from './Post'

describe(`Post component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .Post by default', () => {
    const wrapper = shallow(<Post />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Post given props', () => {
    const wrapper = shallow(<Post {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
