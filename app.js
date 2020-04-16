'use strict';

import fs from 'fs';
import express from 'express';

const App = express();
const Port =6969;
App.get('/',(req,res) => {
	res.send('Index');
});

App.listen(Port,()=> console.log(`Hey! I am listening on ${Port}`));
