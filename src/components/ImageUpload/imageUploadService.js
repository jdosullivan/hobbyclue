import multiparty from 'multiparty';
import fs from 'fs';

function uploadImage(imageFile) {
  return new Promise((resolve, reject) => {
    let imageFormData = new FormData();

    imageFormData.append('imageFile', imageFile);

    var xhr = new XMLHttpRequest();

    xhr.open('post', '/upload', true);

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };

    xhr.send(imageFormData);

  });
}


function saveImage(req, res) {
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {

    let {path: tempPath, originalFilename} = files.imageFile[0];
    let copyToPath = "./images/" + originalFilename;

    fs.readFile(tempPath, (err, data) => {
      // make copy of image to new location
      fs.writeFile(newPath, data, (err) => {
        // delete temp image
        fs.unlink(tmpPath, () => {
          res.send("File uploaded to: " + newPath);
        });
      });
    });
  })
}

export default {
  uploadImage,
  saveImage
}