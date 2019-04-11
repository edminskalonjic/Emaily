import React from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {

    state = {surveyFormReview:false};

    renderContent(){
        if(this.state.surveyFormReview){
            return <SurveyFormReview onCancel = {() =>this.setState({surveyFormReview:false})} />
        }

        return <SurveyForm onSurveyFormSubmit = {() =>this.setState({surveyFormReview:true})}/>

    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form:'surveyForm'
})(SurveyNew);