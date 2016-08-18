import azure from 'azure-storage';
import path from 'path';
import fs from 'fs';

export default function save(req) {
  const blobService = azure.createBlobService();

  return new Promise((resolve, reject) => {
    if (req.busboy) {
      req.busboy.on( 'file', function (fieldname, file, filename) {
        var tmpFilePath = path.join( __dirname, '../../..', 'static', 'uploads', path.basename( fieldname ) );
        var ws = fs.createWriteStream( tmpFilePath );
        file.pipe( ws );

        ws.on( 'finish', function () {
          const containerName = 'postimages';
          blobService.createContainerIfNotExists( containerName, {publicAccessLevel: 'blob'}, function (error) {
            if (error) {
              reject( error );
            }
            else {
              blobService.createBlockBlobFromLocalFile( containerName, filename, tmpFilePath, function (error, result, response) {
                if (error) {
                  reject( error );
                }
                else {
                  resolve( response );
                }
              });
            }
          });
        });
      });
      req.busboy.on( 'field', function (key, value, keyTruncated, valueTruncated) {
        // ...
      } );
      req.pipe( req.busboy );
    }
  });
}