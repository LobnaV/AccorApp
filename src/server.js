require('dotenv').config();

const https = require('https');
const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8443;

const cert = path.resolve(__dirname, '../certs/localhost');


app.use(express.static(path.join(__dirname, '../frontend/dist/app')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist/app/index.html'));
});

https.createServer(
	{
		cert: fs.readFileSync(`${cert}.cert`),
		key: fs.readFileSync(`${cert}.key`),
	},
	app,
).listen(PORT, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`We're up and running at https://localhost:${PORT}`);
});
