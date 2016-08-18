import azure from 'azure-storage';
import path from 'path';
import fs from 'fs';
import config from '../../../config';

const blobService = azure.createBlobService();
const uploadToAzureBlob = (savedFileName, tmpFilePath, cb) => {
  blobService.createContainerIfNotExists( config.azure.postImagesContainer, {publicAccessLevel: 'blob'}, (error) => {
    if (error) {
      reject( error );
    }
    else {
      blobService.createBlockBlobFromLocalFile( config.azure.postImagesContainer, savedFileName, tmpFilePath, (error, result, response) => {
        cb( error, response, result, savedFileName );
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
          uploadToAzureBlob( savedFileName, tmpFilePath, uploadedCallback);
        });
      });

      req.busboy.on( 'field', function (key, value) {
        console.log(`field ${key}:${value}`);
      });

      req.busboy.on('finish', function() {

      });

      req.pipe( req.busboy );
    }

    const uploadedCallback = (error, response, result, savedFileName) => {
      const uploadedUrl = blobService.getUrl( config.azure.postImagesContainer, savedFileName, null, blobService["host"]["primaryHost"] );
      return error ? reject( error ) : resolve( {response, result, url: uploadedUrl} );
    };
  });
}

