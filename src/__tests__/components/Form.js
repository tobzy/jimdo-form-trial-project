import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {Form} from "../../components/Form";

Enzyme.configure({adapter: new Adapter()})

describe('Form Component', () => {

    let wrapper;
    const mockSubmitfn = jest.fn();   // our mock submit function to replace the one provided by mapDispatchToProps
    const mockClearMessagesfn = jest.fn();   // our mock clearMessages function to replace the one provided by mapDispatchToProps
    const props = {
        title: "Jimdo"
    }

    beforeEach(() => {
        wrapper = shallow(<Form {...props} submitForm={mockSubmitfn} clearSubmitMessages={mockClearMessagesfn}/>)
    })

    it('renders self', () => {
        expect(wrapper.find('form').hasClass('jimdo-form')).toBe(true)
    })

    it('renders title', () => {
        expect(wrapper.find('h1').text()).toBe('Jimdo')
    })
    it('renders three form fields', () => {
        expect(wrapper.find('.form-input-group')).toHaveLength(3);
    });

    it('has a button', () => {
        expect(wrapper.find('button').length).toBe(1)
    })

    describe('When the form is submitted', () => {
        beforeEach(() => {
            // fill in name field with Tobe
            wrapper.find('#name').simulate(
                'change',
                {target:
                        {name: 'name', value: 'Tobe'}
                }
            )

            // fill in email field with `onuegbu.tobechukwu@gmail.com`
            wrapper.find('#email').simulate(
                'change',
                {target:
                        {name: 'email', value: 'onuegbu.tobechukwu@gmail.com'}
                }
            )

            // fill in message field with `I would love to work at Jimdo`
            wrapper.find('#message').simulate(
                'change',
                {target:
                        {name: 'message', value: 'I would love to work at Jimdo'}
                }
            )
        })
        it('should call the mock submit function', () => {
            wrapper.find('.jimdo-form').simulate(
                'submit',
                {preventDefault() {}}
            )
            expect(mockSubmitfn.mock.calls.length).toBe(1)
        })

        it('should be called with the name, email and message in the state as arguments', () => {
            // simulate form submission
            wrapper.find('.jimdo-form').simulate(
                'submit',
                {preventDefault() {}}
            )
            // test to see arguments used after its been submitted
            expect(mockSubmitfn.mock.calls[1][0]).toEqual(
                {
                    name:'Tobe',
                    email:'onuegbu.tobechukwu@gmail.com',
                    message:'I would love to work at Jimdo'
                }
            )
        })

    })

})