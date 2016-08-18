import azure from 'azure-storage';
import util from 'util';
import path from 'path';
import fs from 'fs';

export default function save(req, res, nxt) {
  const blobService = azure.createBlobService();
  if (req.busboy) {

    req.busboy.on( 'file', function (fieldname, file, filename, encoding, mimetype) {
      var tmpFilePath = path.join( __dirname, '../../..', 'static', 'uploads', path.basename( fieldname ) );
      var ws = fs.createWriteStream( tmpFilePath );
      file.pipe( ws );

      ws.on( 'finish', function () {
        const containerName = 'postimages';
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, function(error, result, response) {
          if (error) {
            console.log( `createContainerIfNotExists error is ${util.inspect( error )}` );
          }
          else {
            blobService.createBlockBlobFromLocalFile( containerName, filename, tmpFilePath, function (error, result, response) {
              console.log( `createBlockBlobFromLocalFile error is ${util.inspect( error )}` );
              console.log( `createBlockBlobFromLocalFile result is ${util.inspect( result )}` );
              console.log( `createBlockBlobFromLocalFile response is ${util.inspect( response )}` );

              if (!error) {
                // file uploaded
              }
            });
          }
        });
      } );
    } );
    req.busboy.on( 'field', function (key, value, keyTruncated, valueTruncated) {
      // ...
    } );
    req.pipe( req.busboy );
  }

  return new Promise( (resolve, reject) => {
    resolve( {test423243: {one: JSON.stringify( req.files )}} );
  } );
}