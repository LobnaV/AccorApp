const error = require('koa-error');
const Koa = require('koa');
const morgan = require('koa-morgan');
const Router = require('koa-router');
const session = require('koa-session');
const views = require('koa-views');
const ts = require('./ts-api');
const auth = require('./auth');

// const app = new Koa();
 const router = new Router();


router.get('/', async (ctx) => {


	// use this to see calls to the Tradeshift API working
	const { Username} = await ts.getAccount(ctx);
	ctx.state.username = `user ${Username}!`;


	// render the message in the view
	await ctx.render('view');
});
    module.exports = test

