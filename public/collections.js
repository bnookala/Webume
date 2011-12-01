$(window).load(function() {
	if (_.isUndefined(window.Webume)) {
		window.Webume = {};
	}

	if (_.isUndefined(Webume.Collections)) {
		Webume.Collections = {}
	}

	// Basic information collection
	Webume.Collections.BasicsList = Backbone.Collection.extend({
		model: Webume.Models.Basics,
		localStorage: new Store("Basics"),

		initialize: function () {
		},
	});

	// The Education object collection
	Webume.Collections.EducationList = Backbone.Collection.extend({
		model: Webume.Models.Education,
		localStorage: new Store("Education"),

		active: function () {
			return this.filter(function (Education) {
				return Education.get('active');
			});
		},

		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function (Education) {
			return Education.get('order');
		}
	});

	Webume.Collections.ProfessionalList = Backbone.Collection.extend({
		model: Webume.Models.Professional,
		localStorage: new Store("Professional"),

		active: function () {
			return this.filter(function (Profession) {
				return Profession.get('active');
			});
		},

		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function (Professional) {
			return Professional.get('order');
		}
	});

	Webume.Collections.SkillList = Backbone.Collection.extend({
		model: Webume.Models.Skill,
		localStorage: new Store("Skill"),

		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(Skill) {
			return Skill.get('order');
		}
	});

	Webume.Collections.ActivityList = Backbone.Collection.extend({
		model: Webume.Models.Activity,
		localStorage: new Store("Activity"),

		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(Activity) {
			return Activity.get('order');
		}
	});

	Webume.Collections.ProjectList = Backbone.Collection.extend({
		model: Webume.Models.Project,
		localStorage: new Store("Project"),

		nextOrder: function () {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(Project) {
			return Project.get('order');
		}
	});
});
