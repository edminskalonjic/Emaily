import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import {submitSurvey} from '../../actions';
import formFields from './surveyFields';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) =>{

    const fieldsReview = _.map(formFields, ({label, name})=>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Review your survey</h5>
            {fieldsReview}
            <button onClick = {onCancel} className="btn-flat left yellow">
                Back
            </button>
            <button onClick = {() =>submitSurvey(formValues, history)} className="btn-flat right green">
                Send
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, {submitSurvey})(withRouter(SurveyFormReview));