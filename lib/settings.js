const chromeOptions = {
	headless: true,
	defaultViewport: null,
	args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
};

module.exports = chromeOptions;
