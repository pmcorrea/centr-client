import DiscoverPage from './DiscoverPage.js'
import React from 'react';
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('App test suite', () => {
	// Smoke Test
	it('renders without crashing', () => {
		const div = document.createElement('div')

		ReactDOM.render(
			<DiscoverPage />,
			div
		)
		ReactDOM.unmountComponentAtNode(div)
	})

	// Snapshot Test
	it('renders the snapshot', () => {
		const wrapper = shallow(<DiscoverPage />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})
})