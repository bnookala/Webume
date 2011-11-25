$(window).load(function() {
	if (_.isUndefined(window.Webume)) {
		window.Webume = {};
	}

	if (_.isUndefined(Webume.Models)) {
		Webume.Models = {};
	}

	// Basic information about the user
	Webume.Models.Basics = Backbone.Model.extend({
		defaults: function () {
			return {
				name: 'Bhargav Nookala',
				address: '3009 Wynstone Dr.',
				city: 'Champaign',
				state: 'IL',
				zip: '61801',
				country: 'USA',
				email: 'bnooka2@illinois.edu',
				phone: '217-721-1654'
			};
		},
	});

	// The Education Object
	Webume.Models.Education = Backbone.Model.extend({
		defaults: function () {
			return {
				active: false,
				school: 'University of Illinois',
				still_attending: false,
				start_date: '',
				end_date: '',
				description: '',
				degree: 'BS',
				concentration: 'Computer Science',
				city: 'Champaign',
				state: 'Illinois',
				country: 'USA',
				gpa: '',
				order: Webume.Objects.Education.nextOrder(),
			};
		},

		toggle: function () {
			this.save({active: !this.get("active")});
		},

		toggle_attending: function () {
			this.save({still_attending: !this.get("still_attending")});
		}
	});

	Webume.Models.Professional = Backbone.Model.extend({
		defaults: function () {
			return {
				active: false,
				workplace: 'VMWare',
				workplace_title: 'Member of Technical Staff Intern',
				workplace_brief: 'Did things!',
				current_workplace: false,
				start_date: '',
				end_date: '',
				city: 'Palo Alto',
				state: 'California',
				country: 'USA',
				order: Webume.Objects.Professional.nextOrder(),
			};
		},

		toggle: function () {
			this.save({active: !this.get("active")});
		},

		toggle_current_place_of_work: function () {
			this.save({still_attending: !this.get("still_attending")});
		}
	});

	Webume.Models.Skill = Backbone.Model.extend({
		defaults: function () {
			return {
				order: Webume.Objects.Professional.nextOrder(),
				type: 'Languages',
				skills: 'Python, JavaScript',
			};
		}
	});
});
