MemberStack.onReady.then(function(member) {
	var memberstack_ID ="";
	if (member.loggedIn) {
		memberstack_ID = member["id"]
		console.log("logged in member: "+memberstack_ID)
		console.log("not logged in")
	} else {
		memberstack_ID = "1234"
	}
})