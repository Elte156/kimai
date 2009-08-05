/**
 * This file is part of 
 * Kimai - Open Source Time Tracking // http://www.kimai.org
 * (c) 2006-2009 Kimai-Development-Team
 * 
 * Kimai is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; Version 3, 29 June 2007
 * 
 * Kimai is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Kimai; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * 
 */

 // ===========
 // ADMIN PANEL
 // ===========

function ap_ext_onload() {
    ap_ext_resize();  
	subactivelink = "#ap_ext_sub1";
    // $(subactivelink).addClass("active"); 
    // $("div#ap_ext_sub1 > div.ap_ext_panel_header").click(ap_ext_subtab_expand(1));
    $("#loader").hide();
}

function ap_ext_resize() {

	scroller_width = 14;
	if (navigator.platform.substr(0,3)=='Mac') {
	    scroller_width = 16;
	}
	
	pagew = pageWidth();
	drittel = (pagew-10)/3 - 7 ;
	
	panel_w = pagew-24;
	panel_h = pageHeight()-10-headerHeight();
	
	$(".ap_ext_subtab").css("display", "none");
	    
	$("#ap_ext_panel").css("width", panel_w);
	$(".ap_ext_panel_header").css("width", panel_w);
	$("#ap_ext_panel").css("height", panel_h);
	
	$(".ap_ext_subtab").css("height", panel_h - (7*25)-20-1);
	
    ap_ext_subtab_autoexpand();
}

function ap_ext_subtab_expand(id) {
	$("#ap_ext_sub1").removeClass("active");
	$("#ap_ext_sub2").removeClass("active");
	$("#ap_ext_sub3").removeClass("active");
	$("#ap_ext_sub4").removeClass("active");
	$("#ap_ext_sub5").removeClass("active");
	$("#ap_ext_sub6").removeClass("active");
	$("#ap_ext_sub7").removeClass("active");
	$(".ap_ext_subtab").css("display", "none");	
	
	sub_id="#ap_ext_sub" +id;
	$(sub_id).addClass("active");
	
	subtab="#ap_ext_s"+id;
	$(subtab).css("display", "block");
	
    // ap_ext_activePanel = id;
	$.cookie('ap_ext_activePanel', id);
}

function ap_ext_subtab_autoexpand() {
	ap_ext_activePanel  = $.cookie('ap_ext_activePanel');
    if (ap_ext_activePanel) {
        ap_ext_subtab_expand(ap_ext_activePanel);
    } else {
        ap_ext_subtab_expand(1);
    }
}



// ------------------------------------------------------


function ap_ext_triggerchange() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('knd');
        ap_ext_refreshSubtab('pct');
        ap_ext_refreshSubtab('evt');
    } else {
        tss_hook_flag++;
    }
    if (ap_chk_hook_flag) {
        ap_ext_triggerCHK();
    }
    if (ap_chp_hook_flag) {
        ap_ext_triggerCHP();
    }
    if (ap_che_hook_flag) {
        ap_ext_triggerCHE();
    }
    
    ap_tss_hook_flag = 0;
    ap_rec_hook_flag = 0;
    ap_stp_hook_flag = 0;
    ap_chk_hook_flag = 0;
    ap_chp_hook_flag = 0;
    ap_che_hook_flag = 0;
}



// function ap_ext_triggerTSS() {
// }
// function ap_ext_triggerREC() {
//     logfile("AP: triggerREC");
// }
// function ap_ext_triggerSTP() {
//     logfile("AP: triggerSTP");
// }

function ap_ext_triggerCHK() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('knd');
        ap_ext_refreshSubtab('pct');
    } else {
        ap_chk_hook_flag++;
    }
}

function ap_ext_triggerCHP() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('pct');
    } else {
        ap_chp_hook_flag++;
    }
}

function ap_ext_triggerCHE() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('evt');
    } else {
        ap_che_hook_flag++;
    }
}

// ------------------------------------------------------




// ----------------------------------------------------------------------------------------
// graps the value of the newUser input field 
// and ajaxes it to the createUsr function of the processor
//
function ap_ext_newUser() {
    newuser = $("#newuser").val();
    if (newuser == "") {
        alert(lang_checkUsername);
        return false;
    }
    $.post(ap_ext_path + "processor.php", { axAction: "createUsr", axValue: newuser, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
        ap_ext_editUser(data);
    });
}

function ap_ext_showDeletedUsers() {
    $.post(ap_ext_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 1, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
    });
}

function ap_ext_hideDeletedUsers() {
    $.post(ap_ext_path + "processor.php", { axAction: "toggleDeletedUsers", axValue: 0, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('usr');
    });
}


// ----------------------------------------------------------------------------------------
// graps the value of the newGroup input field 
// and ajaxes it to the createGrp function of the processor
//
function ap_ext_newGroup() {
    newgroup = $("#newgroup").val();
    if (newgroup == "") {
        alert("muh!"); // TODO
        return false;
    }
    $.post(ap_ext_path + "processor.php", { axAction: "createGrp", axValue: newgroup, id: 0 }, 
    function(data) {
        ap_ext_refreshSubtab('grp');
    });
}



// ----------------------------------------------------------------------------------------
// by clicking on the edit button of a user the edit dialogue pops up
//
function ap_ext_editUser(id) {
    floaterShow(ap_ext_path + "floaters.php","editUsr",0,id,400,230);
}

// ----------------------------------------------------------------------------------------
// by clicking on the edit button of a group the edit dialogue pops up
//
function ap_ext_editGroup(id) {
    floaterShow(ap_ext_path + "floaters.php","editGrp",0,id,450,100);
}

// ----------------------------------------------------------------------------------------
// refreshes either user/group/advanced/DB subtab
//
function ap_ext_refreshSubtab(tab) {
    $.post(ap_ext_path + "processor.php", { axAction: "refreshSubtab", axValue: tab, id: 0 }, 
    function(data) {
        switch(tab) {
            case "usr":  target = "#ap_ext_s1"; break
            case "grp":  target = "#ap_ext_s2"; break
            case "adv":  target = "#ap_ext_s3"; break
            case "db":   target = "#ap_ext_s4"; break
            case "knd":  target = "#ap_ext_s5"; break
            case "pct":  target = "#ap_ext_s6"; break
            case "evt":  target = "#ap_ext_s7"; break
        }
        $(target).html(data);
    });
}

// ----------------------------------------------------------------------------------------
// delete user
//
function ap_ext_deleteUser(id) {
    $.post(ap_ext_path + "processor.php", { axAction: "deleteUsr", axValue: 0, id: id }, 
        function(data) {
            if (confirm(data)) {
                $.post(ap_ext_path + "processor.php", {axAction: "deleteUsr", axValue: 1, id: id }, 
                    function() { ap_ext_refreshSubtab('usr'); }
                );
            }
        }
    );
}

// ----------------------------------------------------------------------------------------
// delete group
//
function ap_ext_deleteGroup(id) {
    $.post(ap_ext_path + "processor.php", { axAction: "deleteGrp", axValue: 0, id: id }, 
        function(data) {
            if (confirm(data)) {
                $.post(ap_ext_path + "processor.php", {axAction: "deleteGrp", axValue: 1, id: id }, 
                    function() { ap_ext_refreshSubtab('grp'); }
                );
            }
        }
    );
}

// ----------------------------------------------------------------------------------------
// activates user for login
//
function ap_ext_unbanUser(id) {
    $("#ban"+id).blur();
    $("#ban"+id).html("<img border='0' width='16' height='16' src='../skins/"+skin+"/grfx/loading13.gif'/>");
    $.post(ap_ext_path + "processor.php", { axAction: "unbanUsr", axValue: 0, id: id }, 
        function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "ap_ext_banUser('"+id+"'); return false;" });
        }
    );
}

// ----------------------------------------------------------------------------------------
// toggle ban and unban of users in admin panel
//
function ap_ext_banUser(id) {
    $("#ban"+id).blur();
    $("#ban"+id).html("<img border='0' width='16' height='16' src='../skins/"+skin+"/grfx/loading13.gif'/>");
    $.post(ap_ext_path + "processor.php", { axAction: "banUsr", axValue: 0, id: id },
        function(data) {
            $("#ban"+id).html(data);
            $("#ban"+id).attr({ "ONCLICK": "ap_ext_unbanUser('"+id+"'); return false;" });
        }
    );
}

function ap_ext_checkupdate() {
    $.post("checkupdate.php", { versionping:1 },
        function(data) {
           $('#ap_ext_checkupdate').html(data);
        }
    );
    
}


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
// everything below this line needs revision for some coming version ...
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/*


// ----------------------------------------------------------------------------------------
// if the RETURN key is hit inside a add or edit dialogue this function 
// triggers the OK button
//
function checkKeyPressed(evt,func,params){
  evt = (evt) ? evt : (window.event) ? event : null;
  if (evt) {
    var charCode = (evt.charCode) ? evt.charCode :
                   ((evt.keyCode) ? evt.keyCode :
                   ((evt.which) ? evt.which : 0));
    if (charCode == 13) {
        if (params) func = func+"('"+params+"');";
        eval(func);
    }
  }    
}

function switchUsr(id) {
    alert("Under construction...\nUser to switch to: "+id);
}

function backupUsr(id) {
    alert("Under construction...\nUser to backup: "+id);
}

function backupAll() {
    alert("Under construction...");
}

function switchGrp(id) {
    alert("Under construction...\nGroup to switch to: "+id);
}

function backupGrp(id) {
    alert("Under construction...\nGroup to backup: "+id);
}


*/