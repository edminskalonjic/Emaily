import React from 'react';

export default ({input, meta :{touched,error}, label}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} autoComplete="off" style={{marginBottom:'5px'}}/>
            <div className="red-text" style={{marginBottom:'10px'}}>
                {touched && error}
            </div>
        </div>
    );
}