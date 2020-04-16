'use strict';
import fs from 'fs';
import express from 'express';

const App = express();
const Port =6969;


App.get('/',(req,res) => {
	res.send('Index');
});


App.get('/show',(req,res) => {

	const path = './playlist/Time_Forgets.mp4',
        stat = fs.statSync(path),
        fileSize = stat.size,
        range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-"),
         start = parseInt(parts[0], 10),
         end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1,
        chunksize = (end-start)+1,
        file = fs.createReadStream(path, {start, end}),
        head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});



App.listen(Port,()=> console.log(`Hey! I am listening on ${Port}`));
