import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';
import formFields from './surveyFields';


class SurveyForm extends React.Component{

    renderFields(){

        return _.map(formFields, ({name, label}) => {
            return (
                <div key={name}>
                    <Field  component={SurveyField} type="text" label = {label} name = {name} />
                </div>
            )
        });

    }

    render(){
        return (
            <div>
                <h5>Create a new Survey</h5>
                <form onSubmit = {this.props.handleSubmit(this.props.onSurveyFormSubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn-flat red left ">
                        Cancel
                    </Link>
                    <button type="submit" className="btn-flat green right">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = (formValues)=>{
    const error = {}; 

    error.recipients = validateEmail(formValues.recipients || ' '); 

    _.each(formFields, ({name}) =>{
        if(!formValues[name]){
            error[name] = 'You must enter a value!';
        }
    })
    return error;
}

export default reduxForm({
    form:'surveyForm',
    validate,
    destroyOnUnmount:false
})(SurveyForm);