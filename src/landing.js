import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import config from '../config';
import util from 'util';

export default (res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var landingPageFile = path.join(__dirname, '..', 'static', 'landing', 'landing.html');
  fs.readFile(landingPageFile, 'utf-8', function(err, content) {
    if (err) {
      res.end(`error occurred with landing page ${util.inspect(err)}`);
      return;
    }
    res.end(ejs.render(content, { websiteName: config.app.title,
                                  tagLine: config.tagLine,
                                  keywords: "business, city, local, posts, media, website, pages",
                                  topMenuItems: [ { name: "home", class: "active" }, { name: "services" }, { name: "about" }, { name: "benefits" },{ name: "screenshots" },{ name: "features" },{ name: "pricing" }, { name: "news" }, { name: "download" , class: "last-md" } ]
                                },
                                {
                                  filename: landingPageFile,
                                  pretty:   true
                                }));
  });
};