const keys = require('../../config/keys');

module.exports = survey =>{
    return `
    <div>
        <h3>This is my First Email</h3>
        <p>Please answer to it</p>
        <p>${survey.body}</p>
        <div>
            <a href="${keys.redirectRoute}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
            <a href="${keys.redirectRoute}/api/surveys/${survey.id}/no">No</a>
        </div>
    </div> 
    `;
}