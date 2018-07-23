import * as FORM_ACTIONS from "./types";
import {apiCallSimulator} from "../utils";


export const startFormSubmit = () => {
    return {
        type: FORM_ACTIONS.SUBMIT_FORM_START
    }
}

export const formSubmitSuccess = (response) => {
    return {
        type: FORM_ACTIONS.SUBMIT_FORM_SUCCESS,
        payload:response
    }
}

export const formSubmitError = () => {
    return {
        type: FORM_ACTIONS.SUBMIT_FORM_ERROR
    }
}
export const clearSubmitMessages = () => {
    return {
        type: FORM_ACTIONS.CLEAR_MESSAGES
    }
}

export const submitForm = (form) => {
    return dispatch => {
        //dispatch the start form submit
        dispatch(startFormSubmit());

        //apiSimulator is a timeout function that returns a promise
        //and takes in the number of milliseconds as argument
        return apiCallSimulator(3000)
            .then((response) => {
                //dispatch form submitted successfully
                dispatch(formSubmitSuccess(response))
            })
            .catch(
                err => {
                   dispatch(formSubmitError())
                }
            );
    }
}