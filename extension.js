const vscode = require('vscode');
const axios = require('axios');
const { XMLParser} = require('fast-xml-parser');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	const res = await axios.get('https://medium.com/feed/@sonukumarkushwaha');
	const parser = new XMLParser();
	const articles = parser.parse(res.data).rss.channel.item.map(article => {
		return {
		  label: article.title,
		  link: article.link,
		}
	});


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('search-sonu-blog.searchSonuBlog', async function () {
		const article = await vscode.window.showQuickPick(articles, {
		  matchOnDetail: true,
		})
  
		if (article == null) return
  
		vscode.env.openExternal(article.link)
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
