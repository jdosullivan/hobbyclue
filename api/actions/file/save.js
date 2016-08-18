import azure from 'azure-storage';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join( __dirname, '../../..', 'static', 'uploads' );
const uploadWriteStreamToAzure = (savedFileName, tmpFilePath, reject, resolve) => {
  const containerName = 'postimages';
  const hostName = 'https://hobbyclueprod1.blob.core.windows.net';
  const blobService = azure.createBlobService();

  blobService.createContainerIfNotExists( containerName, {publicAccessLevel: 'blob'}, function (error) {
    if (error) {
      reject( error );
    }
    else {
      blobService.createBlockBlobFromLocalFile( containerName, savedFileName, tmpFilePath, function (error, result, response) {
        if (error) {
          reject( error );
        }
        else {
          const uploadedUrl = blobService.getUrl( containerName, savedFileName, null, hostName );
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
      req.busboy.on( 'file', function (fieldname, file) {
        const savedFileName = path.basename( fieldname );
        const tmpFilePath = path.join( uploadsDir, savedFileName );

        saveTempFile(file, tmpFilePath, savedFileName).on( 'finish', () => {
          uploadWriteStreamToAzure( savedFileName, tmpFilePath, reject, resolve);
        });
      });
      req.pipe( req.busboy );
    }
  });
}

