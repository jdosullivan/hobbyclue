import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import DropZone from '../../components/ImageUpload/DropZone';

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
    const {fields: {id, title, body}, handleSubmit, resetForm, submitHandler} = this.props;
    const formSubmit = (formValues) => {
      submitHandler( formValues ).then( () => {
        resetForm();
      } );
    };
    const styles = require('./PostForm.scss');
    return (
      <form key={id} className={styles.postForm} onSubmit={handleSubmit(formSubmit)}>
        <div>
          <input type="text" placeholder="Title of your post ..." {...title} />
        </div>
        <div>
          <input type="text" placeholder="Body of your post ..." {...body} />
          <DropZone />
        </div>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
