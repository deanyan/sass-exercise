# sass-exercise

A single web page to exercise building page with SASS CSS processor and DOM manipulate through vanilla JavaScript functions

## Main JavaScript functions

All helper functions are defined in namespace as follows:
```html
var profero = profero || {};
```

A utility helper function to grap all elements with the same class name under a certain root(parent) element or otherwise document element
```html
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
```

Define a constructor to wrap instance methods simply
```javascript
var Profile = function() {
	this.skills = [];
	this.id;
};
```

## Instance methods
Initialize method, harness chainable of methods, since all of which return object instance itself
```javascript
	init: function() {
		this.removeProfile()
			.deleteSkill()
			.addSkills()
			.closeModel();
		
	},
```

Most of methods take on simple and similar logic, one trap to notice when iterating bind events to DOMs is avoid closure issue

Remove an item method, using another anonymous to workround this issue
```javascript
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
```

Start up all functions
```javascript
new Profile().init();
```
