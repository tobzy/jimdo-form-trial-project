import * as FORM_ACTIONS from "../../actions/types";
import * as actions from "../../actions/index";

//imports for async test
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

//test suite for synchronous actions..
describe('actions', () => {
    //tests for ensure correct action type.

    it('startFormSubmit action has the correct type', () => {
        const action = actions.startFormSubmit();
        expect(action.type).toBe(FORM_ACTIONS.SUBMIT_FORM_START);
    });

    it('formSubmitSuccess action has the correct type', () => {
        const action = actions.formSubmitSuccess();
        expect(action.type).toBe(FORM_ACTIONS.SUBMIT_FORM_SUCCESS);
    });

    it('formSubmitError action has the correct type', () => {
        const action = actions.formSubmitError();
        expect(action.type).toBe(FORM_ACTIONS.SUBMIT_FORM_ERROR);
    });
    it('clearSubmitMessages action has the correct type', () => {
        const action = actions.clearSubmitMessages();
        expect(action.type).toBe(FORM_ACTIONS.CLEAR_MESSAGES);
    });
});

//test suite for asynchronous actions..
describe('async actions', () => {
    it('creates SUBMIT_FORM_SUCCESS when submitting form has been done', () => {

        const expectedActions = [
            {type: FORM_ACTIONS.SUBMIT_FORM_START},
            {
                type: FORM_ACTIONS.SUBMIT_FORM_SUCCESS,
                payload: {
                    "message": "Form successfully submitted...",
                    "success": true
                }
            }
        ]
        const store = mockStore({form: {}})

        return store.dispatch(actions.submitForm()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
})