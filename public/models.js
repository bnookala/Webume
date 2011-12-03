$(window).load(function() {
	if (_.isUndefined(window.Webume)) {
		window.Webume = {};
	}

	if (_.isUndefined(Webume.Models)) {
		Webume.Models = {};
	}

	// Basic information about the user
	Webume.Models.Basics = Backbone.Model.extend({
		type: "basic",
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
		type: "education",
		defaults: function () {
			return {
				active: true,
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
		type: "professional",
		defaults: function () {
			return {
				active: true,
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
		type: "skill",
		defaults: function () {
			return {
				order: Webume.Objects.Professional.nextOrder(),
				type: 'Languages',
				skills: 'Python, JavaScript',
				active: true,
			};
		}
	});

	Webume.Models.Activity = Backbone.Model.extend({
		type: "activity",
		defaults: function () {
			return {
				order: Webume.Objects.Activities.nextOrder(),
				position: 'Treasurer',
				activity_name: 'Reflections | Projections 2009, 2010',
				start_date: '',
				end_date: '',
				activity_description: 'Did a bunch of things!',
				current_activity: false,
				active: true,
			}
		}
	});

	Webume.Models.Project = Backbone.Model.extend({
		type: "project",
		defaults: function () {
			return {
				order: Webume.Objects.Projects.nextOrder(),
				project_name: 'Webume',
				start_date: '',
				end_date: '',
				project_description: 'Made the thing you are currently using',
				active: true,
				github_uri: 'http://github.com/bnookala/webume'
			}
		}
	});
});
