import React, {Component} from 'react';
import {connect} from 'react-redux'
import {submitForm, clearSubmitMessages} from "../actions";

//Styles
import '../styles/form.css'
import '../styles/form.mobile.css'

export class Form extends Component {
    state = {
        name: '',
        email: '',
        message: '',
        error: ''
    }

    componentWillReceiveProps(nextProps){
        //I reset the input fields once I get a successful message that the form has submitted
        if(nextProps.successMessage){
            this.setState({
                name:'',
                email:'',
                message:'',
            })
        }
    }
    handleInputChange = (e) => {
        this.clearMessages();
        let input = e.target
        this.setState(
            {
                [input.name]: input.value
            }
        )
    }

    clearMessages = () => {
        this.props.clearSubmitMessages();
        this.setState({
            error:''
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        let {name, email, message} = this.state;
        if (!name || !email || !message) {
            this.setState({
                error: 'Please complete all the fields'
            })
            return;
        }
        this.props.submitForm(
            {
                name,
                email,
                message,
            }
        )
        this.clearMessages();
    }

    render() {
        return (
            <section className='form-container'>
                <h1>{this.props.title}</h1>
                {this.state.error && (
                    <p className='error-message'>{this.state.error}</p>
                )}
                {this.props.successMessage && !this.state.error && (
                    <p className='success-message'>{this.props.successMessage}</p>
                )}
                <form className='jimdo-form' onSubmit={this.submitForm}>
                    <div className='form-input-group'>
                        <label htmlFor={"name"}>Name</label>
                        <input
                            type='text'
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            name='name'
                            id='name'
                            disabled={this.props.isSubmitting}
                        />
                    </div>
                    <div className='form-input-group'>
                        <label htmlFor={"email"}>Email</label>
                        <input
                            type='email'
                            onChange={this.handleInputChange}
                            value={this.state.email}
                            name='email'
                            id='email'
                            disabled={this.props.isSubmitting}
                        />
                    </div>
                    <div className='form-input-group'>
                        <label htmlFor={"message"}>Message</label>
                        <textarea
                            onChange={this.handleInputChange}
                            value={this.state.message}
                            name='message'
                            id='message'
                            disabled={this.props.isSubmitting}
                        />
                    </div>
                    <button
                        onClick={this.submitForm}
                        disabled={this.props.isSubmitting}
                    >
                        {this.props.isSubmitting && (
                            <div className='loader'></div>
                        )}
                        {!this.props.isSubmitting && (
                            <span>
                                SUBMIT FORM
                            </span>
                        )}
                    </button>
                </form>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSubmitting: state.form.isSubmitting,
        error: state.form.error,
        successMessage: state.form.successMessage,
    }
}

const mapDispatchToProps = {submitForm, clearSubmitMessages}

export default connect(mapStateToProps, mapDispatchToProps)(Form)