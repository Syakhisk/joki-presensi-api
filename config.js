const dev = process.env.NODE_ENV !== "production";

const siteurl_prod = "https://joki-presensi.sakis.me";
const siteurl_dev = "http://localhost:3000";

const serverurl_prod = "https://jokipresensi-server.herokuapp.com/";
const serverurl_dev = "http://localhost:3001";

module.exports = {
	siteUrl: dev ? siteurl_dev : siteurl_prod,
	serverUrl: dev ? serverurl_dev : serverurl_prod,
};
