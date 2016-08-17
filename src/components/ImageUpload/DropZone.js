import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import underscore from 'lodash';

const thumbwidthHeight = '100px';
const dropZoneStyle = {
  width: thumbwidthHeight,
  height: thumbwidthHeight,
  border: '2px dashed rgb(102, 102, 102)',
  borderRadius: '5px'
};

export default class DropZone extends Component {
  constructor(props) {
    super( props );
    this.state = {files: [], showOpenButton: false};
    this._onOpenClick = () => {
      this.onOpenClick();
    };
    this._onDrop = (files) => {
      this.onDrop( files );
    };
  }

  onDrop(files) {
    let appendedFiles = [...this.state.files];
    files.forEach( function (file) {
      const indexOfFile = underscore.findIndex(appendedFiles, function(f) {
        return f.name === file.name && f.lastModified === file.lastModified ;
      });

      if (indexOfFile === -1) {
        appendedFiles.push( file );
      }
    } );

    this.setState( {
      files: appendedFiles
    } );
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
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            {files &&
            files.map( (file) => {
              return (<div className="col-md-2" key={`img.${file.preview}`}>
                <img height={thumbwidthHeight} width={thumbwidthHeight} src={file.preview}/>
                <a onClick={() => { this.onRemove(file); }}>Remove</a>
              </div>);
            } )}
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
