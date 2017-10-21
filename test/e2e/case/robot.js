module.exports = {
	'night watch test': function (browser) {
		browser
			.url('http://www.google.com')
			.maximizeWindow()
			.waitForElementVisible('body', 2000)
			.setValue('input[type=text]', '爱江山更爱美人')
			.waitForElementVisible('input[type="submit"]:nth-child(1)', 1000)
			.click('input[type="submit"]:nth-child(1)')
			.pause(2000).end()
	}
}
