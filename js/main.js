/**
 */

var profero = profero || {};

profero.util = profero.util || {
	
	getElementsByClass: function(id, tag, className) {
		var root = id ? document.getElementById(id) : document,
			tags = root.getElementsByTagName(tag);
		
		var elems = [];
		
		for(var i = 0, len = tags.length; i < len; i++) {
			if( tags[i].className === className ) {
				elems.push(tags[i]);
			}
		}
		
		return elems ? elems : undefined;
	}
};

var Profile = function() {
	this.skills = [];
	this.id;
	
};

Profile.prototype = {
	init: function() {
		this.removeProfile()
			.deleteSkill()
			.addSkills()
			.closeModel();
		
	},

	removeProfile: function() {
		var buttons = profero.util.getElementsByClass('myTabContent', 'button', 'deleteProfile');
		
		for(var i = 0, len = buttons.length; i < len; i++) {
			
			(function(delButton){
			
				delButton.onclick = function() {
				
					var profileId = 'profile-' + delButton.getAttribute('data-profile-id');
					var profile = document.getElementById(profileId);
					var model = document.getElementById('addSkillsModel');
					
					profile.parentNode.removeChild(profile);
					
					if(model.style.display === 'block'){
						model.style.display = 'none';
					}
				}
			})(buttons[i]);		
		}
		
		return this;

	},
	
	addSkills: function() {
		
		var profileId;
		
		var buttons = profero.util.getElementsByClass('myTabContent', 'button', 'addSkills');
		
			
		for(var i = 0, len = buttons.length; i < len; i++) {
			
			(function(addButton){
			
				addButton.onclick = function() {

					var ele = this;
					var top = 0;
					var left = 0;
					
					var model;
								
					profileId = 'profile-' + addButton.getAttribute('data-profile-id');
					
					model = document.getElementById('addSkillsModel');
				   
					while(ele.offsetParent) {
						top += ele.offsetTop;
						left += ele.offsetLeft;
						ele = ele.offsetParent;
					}
					
					model.style.display = 'block'
					model.style.top = top + 45 + 'px';
					model.style.left = left + 15 + 'px';
					
		
				}
			})(buttons[i]);		
		}
		
		
		document.getElementById('saveSkills').onclick = function() {
		
			var skills = document.getElementById('skills').value;
			
			if(skills) {

				skills = skills.split(',');
				
				for(var i = 0, len = skills.length; i < len; i++) {
					var d = document.createElement('div');
					d.innerHTML = '<dd>' + skills[i] + ' <span><a href="#" class="deleteSkill">&times;</a></span></dd>';
				
					var target = profero.util.getElementsByClass(profileId, 'dl', 'profile-skills');

					target[0].appendChild(d);
				
				}
			}
					
		};
	
		return this;
	},
	
	deleteSkill: function() {
		var anchors = profero.util.getElementsByClass('myTabContent', 'a', 'deleteSkill');
		for(var i = 0, len = anchors.length; i < len; i++) {
			(function(anchor){
			
				anchor.onclick = function() {

					var target = anchor.parentNode.parentNode;
		
					target.parentNode.removeChild(target);
					
					return false;
				}
			})(anchors[i]);	
		}
		
		return this;
	},
	
	closeModel: function() {
		document.getElementById('closeModel').onclick = function() {
			document.getElementById('addSkillsModel').style.display = 'none';
		}
	}
};

new Profile().init();