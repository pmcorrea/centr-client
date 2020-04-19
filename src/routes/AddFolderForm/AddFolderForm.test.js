import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolderForm from './AddFolderForm'

describe(`AddFolderForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.AddFolderForm by default', () => {
    const wrapper = shallow(<AddFolderForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the AddFolderForm given props', () => {
    const wrapper = shallow(<AddFolderForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
