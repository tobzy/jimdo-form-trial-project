import * as FORM_ACTIONS from "../actions/types";

const initialState = {
    isSubmitting:false,
    error: false,
    successMessage:''
}
export default function (state = initialState, action) {
    switch (action.type) {
        case FORM_ACTIONS.SUBMIT_FORM_START:
            return {
                ...state,
                isSubmitting:true
            }
        case FORM_ACTIONS.SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                isSubmitting:false,
                error:false,
                successMessage:action.payload.message
            }
        case FORM_ACTIONS.SUBMIT_FORM_ERROR:
            return {
                ...state,
                isSubmitting:false,
                error:true
            }
        case FORM_ACTIONS.CLEAR_MESSAGES:
            return {
                ...state,
                successMessage:''
            }

    }
    return state
}