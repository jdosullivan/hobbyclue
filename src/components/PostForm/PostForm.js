import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm( {
  form: 'post',
  fields: ['id', 'title', 'body']
} )
export default class NewPost extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired
  };

  render() {
    const {fields: {id, title, body}, handleSubmit, resetForm, submitHandler } = this.props;
    const formSubmit = (formValues) => {
      submitHandler(formValues).then(() => {
        resetForm();
      });
    };
    return (
      <form key={id} className="postForm" onSubmit={handleSubmit(formSubmit)}>
        <input type="text" placeholder="Title of your post ..." {...title} />
        <input type="text" placeholder="Body of your post ..." {...body} />
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
