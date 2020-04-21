import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PostWithContent from './PostWithContent'

describe(`PostWithContent component`, () => {
  const props = {
    post: {
      "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "Dogs",
      "modified": "2019-01-03T00:00:00.000Z",
      "content": "Corporis accusamus placeat.\n \rUnde."
    },
    match: {
      params: {
        postId: 0
      }
    }
  }

  it('renders a .PostWithContent by default', () => {
    const wrapper = shallow(<PostWithContent {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Post with post prop', () => {
    const post = shallow(<PostWithContent {...props} />)
      .find('Post')
    expect(toJson(post)).toMatchSnapshot()
  })

  it(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    [{
      post: { "content": "Content with n r.\n \rafter n r." },
      match: {params:{postId:0}}
    }, {
      post: { "content": "Content with n.\nafter." },
      match: {params:{postId:0}}
    }].forEach(props => {
      const content = shallow(<PostWithContent {...props} />)
        .find('PostWithContent__content')
      expect(toJson(content)).toMatchSnapshot()
    })
  })
})
