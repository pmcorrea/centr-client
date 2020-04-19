import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PublicPost from './PublicPost'

describe(`PublicPost component`, () => {
  const props = {
    id: 'a',
    name: 'test-class-name',
    modified: new Date(2018, 12, 15),
  }

  it('renders a .PublicPost by default', () => {
    const wrapper = shallow(<PublicPost />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the PublicPost given props', () => {
    const wrapper = shallow(<PublicPost {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
