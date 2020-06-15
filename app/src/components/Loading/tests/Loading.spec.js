import React from 'react'
import { mount } from 'enzyme'
import Loading from '../Loading'

describe('Loading', () => {
  it('should render correctly', () => {
    let wrapper = mount(<Loading />)

    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toHaveLength(1)
  })

  it('should called handleOnClick a after click on it', () => {
    const handleOnClick = jest.fn()
    let wrapper = mount(<Loading handleOnClick={handleOnClick} />)
    wrapper.simulate('click')
    expect(handleOnClick).toHaveBeenCalled()
    expect(handleOnClick).toHaveBeenCalledTimes(1)
  })
})
