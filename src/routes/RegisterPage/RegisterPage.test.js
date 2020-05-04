import RegisterPage from './RegisterPage.js'
import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('App test suite', () => {
	// Smoke Test
	it('renders without crashing', () => {
		const div = document.createElement('div')

		ReactDOM.render(
			<RegisterPage />,
			div
		)
		ReactDOM.unmountComponentAtNode(div)
	})

	// Snapshot Test
	it('renders the snapshot', () => {
		const wrapper = shallow(<RegisterPage />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})
})