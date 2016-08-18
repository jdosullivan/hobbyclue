import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';

const thumbwidthHeight = '100px';
const dropZoneStyle = {
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: '5px'
};
const spinner = require( './images/ajax_loader_blue_48.gif' );
const spinnerOverlay = {
  position: 'absolute',
  top: 0,
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  background: `rgba(255,255,255, 0.3) url(${spinner}) center center no-repeat`
};


const ThumbnailBox = ({file, onRemoveHandler}) => {
  return (
    <div key={`img.${file.preview}`} style={{ position: 'relative' }}>
      <img height={thumbwidthHeight} width={thumbwidthHeight} src={file.preview}/>
      <a onClick={onRemoveHandler}>Remove</a>
      {file.loading && <div style={spinnerOverlay} />}
    </div>
  );
};

export default class DropZone extends Component {
  static propTypes = {
    saveFileHandler: PropTypes.func.isRequired,
    images: PropTypes.any
  };

  constructor(props) {
    super( props );
    this.state = {files: props.images, showOpenButton: false};
    this._onOpenClick = () => { this.onOpenClick(); };
    this._onDrop = (files) => { this.onDrop( files ); };
  }

  onDrop(files) {
    const appendedFiles = [...this.state.files];
    const {saveFileHandler} = this.props;
    let filesChanged = false;
    files.forEach( (file) => {
      const indexOfFile = underscore.findIndex( appendedFiles, (filename) => {
        return filename.name === file.name && filename.lastModified === file.lastModified;
      });

      if (indexOfFile === -1) {
        appendedFiles.push( {...file, loading: true} );

        const that = this;
        saveFileHandler( file ).then(function(result) {
          if (result.response.isSuccessful && result.response.statusCode === 201) {
            const index = underscore.indexOf( appendedFiles, underscore.find( appendedFiles, file ) );
            appendedFiles.splice( index, 1, {...file, uploadedUrl: result.url, loading: false} );
            that.setState( {
              files: appendedFiles
            } );
          }
        });
        filesChanged = true;
      }
    });

    if (filesChanged) {
      this.setState({
        files: appendedFiles
      });
    }
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  onRemove(file) {
    const updatedFiles = underscore.remove( this.state.files, (currentFile) => {
      return currentFile.name !== file.name;
    });

    this.setState( {
      files: updatedFiles
    });
  }

  render() {
    const {files, showOpenButton} = this.state;
    return (
      <div>
        <input type="hidden" name="selectedImages" value={`${files.map( JSON.stringify )}`}/>
        <div className="container-fluid">
          <div className="row">
            {files && files.map( (file) => {
              return (<div className="col-md-2">
                        <ThumbnailBox file={file} onRemoveHandler={() => { this.onRemove( file ); }} />
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
