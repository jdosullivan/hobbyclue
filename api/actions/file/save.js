import azure from 'azure-storage';
import path from 'path';
import fs from 'fs';

export default function save(req) {
  const blobService = azure.createBlobService();

  return new Promise((resolve, reject) => {
    if (req.busboy) {
      req.busboy.on( 'file', function (fieldname, file, filename) {
        const savedFileName = path.basename( fieldname );
        var tmpFilePath = path.join( __dirname, '../../..', 'static', 'uploads', savedFileName );
        var ws = fs.createWriteStream( tmpFilePath );
        file.pipe( ws );

        ws.on( 'finish', function () {
          const containerName = 'postimages';
          const hostName = 'https://hobbyclueprod1.blob.core.windows.net';
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
                  const uploadedUrl = blobService.getUrl(containerName, savedFileName, null, hostName);
                  resolve( { response, result, url: uploadedUrl });
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