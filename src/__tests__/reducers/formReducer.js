import * as FORM_ACTIONS from "../../actions/types";
import formReducer from "../../reducers/formReducer";


describe("Form Reducer", () => {
    it('handles action with unknown type', () => {
        expect(formReducer(undefined, {})).toEqual({
            isSubmitting: false,
            error: false,
            successMessage:''
        })
    })

    it("handles action of type SUBMIT_FORM_START", () => {
        let action = {
            type: FORM_ACTIONS.SUBMIT_FORM_START
        }
        expect(formReducer(undefined, action)).toEqual({
            isSubmitting: true,
            error: false,
            successMessage:''
        });
    });

    it("handles action of type SUBMIT_FORM_SUCCESS", () => {
        let action = {
            type: FORM_ACTIONS.SUBMIT_FORM_SUCCESS,
            payload:{
                success: true,
                message:'Form successfully submitted'
            }
        }
        expect(formReducer(undefined, action)).toEqual({
            isSubmitting: false,
            error: false,
            successMessage:'Form successfully submitted'
        });
    });
})