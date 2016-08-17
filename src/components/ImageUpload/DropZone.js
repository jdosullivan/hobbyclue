import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';
// import util from 'util';

const thumbwidthHeight = '100px';
const dropZoneStyle = {
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: '5px'
};

export default class DropZone extends Component {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saveFileHandler: PropTypes.func.isRequired,
    value: PropTypes.any // array or individual value
  };

  constructor(props) {
    super( props );
    this.state = {files: props.value, showOpenButton: false};
    this._onOpenClick = () => {
      this.onOpenClick();
    };
    this._onDrop = (files) => {
      this.onDrop( files );
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { files } = nextState;
    if (this.state.files && this.state.files !== files) {
      const { onChange } = nextProps;
      onChange( nextState.files.map( JSON.stringify ) );
    }
  }


  onDrop(files) {
    const appendedFiles = [...this.state.files];
    const { saveFileHandler } = this.props;
    let filesChanged = false;
    files.forEach( (file) => {
      const indexOfFile = underscore.findIndex( appendedFiles, (filename) => {
        return filename.name === file.name && filename.lastModified === file.lastModified;
      } );
      if (indexOfFile === -1) {
        appendedFiles.push( file );
        saveFileHandler(file);
        filesChanged = true;
      }
    });

    if (filesChanged) {
      this.setState( {
        files: appendedFiles
      } );
    }
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onRemove(file) {
    const updatedFiles = underscore.remove( this.state.files, (currentFile) => {
      return currentFile.name !== file.name;
    } );
    this.setState( {
      files: updatedFiles
    } );
  }

  render() {
    const {files, showOpenButton} = this.state;
    const {...rest} = this.props;
    return (
      <div>
        <input type="hidden" {...rest} />
        <div className="container-fluid">
          <div className="row">
            {files && files.map( (file) => {
              return (<div className="col-md-2" key={`img.${file.preview}`}>
                        <img height={thumbwidthHeight} width={thumbwidthHeight} src={file.preview}/>
                        <a onClick={() => { this.onRemove(file); }}>Remove</a>
                      </div>);
            })}
        <div className="col-md-2">
          <Dropzone ref="dropzone" onDrop={this._onDrop} style={dropZoneStyle}>
            <div>
              <div>Add photo</div>
              <i className="fa fa-plus"/>
            </div>
          </Dropzone>
        </div>
      </div>
      </div>
      {showOpenButton && <button type="button" onClick={this._onOpenClick}>Open Dropzone</button>}
      </div>
    );
  }
}
