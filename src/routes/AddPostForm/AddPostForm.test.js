import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddPostForm from './AddPostForm'

describe(`AddPostForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.AddPostForm by default', () => {
    const wrapper = shallow(<AddPostForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the AddPostForm given props', () => {
    const wrapper = shallow(<AddPostForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
