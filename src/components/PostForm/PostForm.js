import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import DropZone from '../../components/ImageUpload/DropZone';

@reduxForm( {
  form: 'post',
  fields: ['id', 'title', 'body', 'images'],
  initialValues: {
    images: []
  }
})
export default class PostForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitHandler: PropTypes.func.isRequired,
    saveFileHandler: PropTypes.func.isRequired
  };

  render() {
    const {fields: {id, title, body}, handleSubmit, resetForm, submitHandler, saveFileHandler } = this.props;
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
          <DropZone images={[]} saveFileHandler={saveFileHandler} />
        </div>
        <input type="submit" value="Post"/>
      </form>
    );
  }
}
