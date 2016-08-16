import React, {Component, PropTypes} from 'react';

export default class ImageUpload extends Component {
  static propTypes = {
    imageUrl: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { file: '', imageUrl: '' };
    this._handleImageChange = (event) => { this.handleImageChange(event); };
    this._handleSubmit = (event) => { this.handleSubmit(event); };
  }

  handleSubmit() {
    // TODO: do something with -> this.state.file
  }

  handleImageChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {imageUrl} = this.state;
    let $imagePreview = null;
    if (imageUrl) {
      $imagePreview = (<img src={imageUrl} />);
    }

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
        </form>
        {$imagePreview}
      </div>
    );
  }

}
