
var SetLock = (lock) => {
	let url = "http://" +  localStorage.host + "/" + (lock ? "lock" : "unlock");

	$.ajax({
		url: url,
		success: function() {
			$("#lock, #unlock").removeClass()
			$(lock ? "#lock" : "#unlock").addClass("focus");
			localStorage.status = (lock == true);
		}, 
		error: function (xhr, textStatus, thrownError) {
			let html = "";
			html += '<div class="alert alert-danger alert-dismissible" role="alert">';
			html += '  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
			html += '  <strong>Error!</strong> ไม่สามารถส่งคำร้องไปที่โฮส ' + localStorage.host + ' ได้';
			html += '</div>';
			$("#alertMsg").append(html);
		},
		timeout: 5000
	});
};

document.addEventListener('DOMContentLoaded', function() {
	if (typeof localStorage.auto_lock === "undefined") localStorage.auto_lock = true;
	
	$("#lock").click(function(e) {
		if (typeof localStorage.host === "undefined") {
			$("#openSetting").click();
			return;
		}
		SetLock(true);
	});
	
	$("#unlock").click(function(e) {
		if (typeof localStorage.host === "undefined") {
			$("#openSetting").click();
			return;
		}
		SetLock(false);
	});
	
	$("#openSetting").click(function(e) {
		$("#settings-host").val(localStorage.host);
		$("#settings-auto-lock").attr("checked", localStorage.auto_lock == "true");
        $('#myModal').modal('show');
    });
	
	$("#save-settings").click(function(e) {
        localStorage.host = $("#settings-host").val();
		localStorage.auto_lock = $("#settings-auto-lock").is(":checked");
		
		$('#myModal').modal('hide');
    });
	
	if (typeof localStorage.status !== "undefined") $(localStorage.status == "true" ? "#lock" : "#unlock").addClass("focus");
	if (typeof localStorage.host === "undefined") $("#openSetting").click();
}, false);