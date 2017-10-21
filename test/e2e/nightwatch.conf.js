module.exports = {
	"src_folders": ["test/e2e/case"],
	"output_folder": "reports/nightwatch",
	"custom_commands_path": "",
	"custom_assertions_path": "",
	"page_objects_path": "",
	"globals_path": "",
	"selenium": {
		"start_process": true,
		"server_path": "./bin/selenium-server-standalone.jar",	//文件太大，不應該放在項目中
		////"server_path": require('selenium-server').path,
		"log_path": "",
		"host": "127.0.0.1",
		"port": 4444,
		"cli_args": {
			"webdriver.chrome.driver": require("chromedriver").path,
			"webdriver.gecko.driver": "",
			"webdriver.edge.driver": ""
		}
	},
	"test_settings": {
		"default": {
			"launch_url": "http://localhost",
			"selenium_port": 4444,
			"selenium_host": "localhost",
			"silent": true,
			"screenshots": {
				"enabled": false,
				"path": ""
			},
			"desiredCapabilities": {
				"browserName": "firefox",
				"marionette": true
			}
		},
		"chrome": {
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true,
				"acceptSslCerts": true
			}
		},
		"edge": {
			"desiredCapabilities": {
				"browserName": "MicrosoftEdge"
			}
		}
	}
}
