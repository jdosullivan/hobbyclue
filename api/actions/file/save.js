import azure from 'azure-storage';
import path from 'path';
import fs from 'fs';
import config from '../../../config';

const uploadToAzureBlob = (savedFileName, tmpFilePath, reject, resolve, cb) => {
  const blobService = azure.createBlobService();

  blobService.createContainerIfNotExists( config.azure.postImagesContainer, {publicAccessLevel: 'blob'}, (error) => {
    if (error) {
      reject( error );
    }
    else {
      blobService.createBlockBlobFromLocalFile( config.azure.postImagesContainer, savedFileName, tmpFilePath, (error, result, response) => {
        if (error) {
          reject( error );
        }
        else {
          const uploadedUrl = blobService.getUrl( config.azure.postImagesContainer, savedFileName, null, config.azure.hostName );
          cb();
          resolve( {response, result, url: uploadedUrl} );
        }
      });
    }
  });
};
const saveTempFile = (file, tmpFilePath) => {
  var ws = fs.createWriteStream( tmpFilePath );
  file.pipe( ws );
  return ws;
};


export default function save(req) {
  return new Promise( (resolve, reject) => {
    if (req.busboy) {
      req.busboy.on( 'file', (fieldname, file) => {
        const savedFileName = path.basename( fieldname );
        const tmpFilePath = path.join( config.uploadsDir, savedFileName );

        saveTempFile(file, tmpFilePath, savedFileName).on( 'finish', () => {
          uploadToAzureBlob( savedFileName, tmpFilePath, reject, resolve, uploadedCallback);
        });
      });
      req.pipe( req.busboy );
    }

    const uploadedCallback = () => {
      console.log(`file save callback called`);
    };
  });
}

