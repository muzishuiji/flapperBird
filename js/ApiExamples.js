
class ApiExamples {
	getUserInfo() {
		wx.getUserInfo({
			success: function(res) {
				console.log(res);
			}
		})
	}
	login() {
		wx.login({
			success: (res) => {
				console.log(res);
			}
		})
	}
	getSetting() {
		wx.getSetting({
			success: (res) => {
				console.log(res);
			}
		})
	}
}

export default  ApiExamples;