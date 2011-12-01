$(window).load(function() {
	if (_.isUndefined(window.Webume)) {
		window.Webume = {};
	}

	if (_.isUndefined(Webume.Views)) {
		Webume.Views = {};
	}

	Webume.Views.BasicsView = Backbone.View.extend({
		tagName: "div",
		template: _.template($('#basics-template').html()),
		events: {
			"keypress form#basic_info_input"      : "updateOnEnter",
			"click form#basic_info_input" : "edit",
			"blur form#basic_info_input" : "close",
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		edit: function () {
			$(this.el).addClass('editing');
		},

		close: function () {
			this.model.save({
				name: this.$('.name_input').val(),
				address: this.$('.basics_address').val(),
				city: this.$('.basics_city').val(),
				state: this.$('.basics_state').val(),
				zip: this.$('.basics_zip').val(),
				phone: this.$('.phone').val(),
				email: this.$('.email_addr').val(),
			});
			$(this.el).removeClass('editing');
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},
	});

	// Render the view for education objects
	Webume.Views.EducationView = Backbone.View.extend({
		tagName: "li",
		template: _.template($('#education-template').html()),

		events: {
			"click a.destroy-education": "destroy",
			"keypress div.education form.data" : "updateOnEnter",
			"click div.education form.data" : "edit",
			"blur div.education form.data" : "close"
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		edit: function () {
			console.log($(this.el));
			$(this.el).addClass('editing');
		},

		remove: function () {
			$(this.el).remove();
		},

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.model.save({
				school: this.$('.education_name').val(),
				education_degree: this.$('.degree').val(),
				concentration: this.$('.education_concentration').val()
			});
			$(this.el).removeClass('editing');
		}
	});
	
	Webume.Views.ProfessionalView = Backbone.View.extend({
		tagName: "li",
		template: _.template($('#professional-template').html()),
		events: {
			"click a.destroy-professional": "destroy",
			"keypress div.professional form.data" : "updateOnEnter",
			"click div.professional form.data" : "edit",
			"blur div.professional form.data" : "close",
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		remove: function () {
			$(this.el).remove();
		},

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		},

		edit: function () {
			$(this.el).addClass('editing');
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			var $professionalForm = $(this.el).find('form');
			this.model.save({
				workplace: this.$('.workplace_name').val(),
				workplace_title: this.$('.workplace_title').val(),
				workplace_brief: this.$('.workplace_brief').val()
			});
			$(this.el).removeClass('editing');
		}
	});

	Webume.Views.SkillsView = Backbone.View.extend({
		tagName: "li",
		template: _.template($('#skill-template').html()),

		events: {
			"click a.destroy-skill": "destroy",
			"keypress div.skill form.data" : "updateOnEnter",
			"click div.skill form.data" : "edit",
			"blur div.skill form.data" : "close",
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		edit: function () {
			$(this.el).addClass('editing');
		},

		remove: function () {
			$(this.el).remove();
		},

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.model.save({
				type: this.$('.skill_type').val(),
				skills: this.$('.skills').val(),
			});
			$(this.el).removeClass('editing');
		}
	});


	Webume.Views.ActivityView = Backbone.View.extend({
		tagName: "li",
		template: _.template($("#activity-template").html()),

		events: {
			"click a.destroy-activity": "destroy",
			"keypress div.activity form.data" : "updateOnEnter",
			"click div.activity form.data" : "edit",
			"blur div.activity form.data" : "close",
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		edit: function () {
			$(this.el).addClass('editing');
		},

		remove: function () {
			$(this.el).remove();
		},

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.model.save({
				activity_name: this.$('.activity_name').val(),
				position: this.$('.activity_position').val(),
				activity_description: this.$('.activity_description').val(),
			});
			$(this.el).removeClass('editing');
		}
	});

	Webume.Views.ProjectView = Backbone.View.extend({
		tagName: "li",
		template: _.template($("#project-template").html()),

		events: {
			"click a.destroy-project": "destroy",
			"keypress div.project form.data" : "updateOnEnter",
			"click div.project form.data" : "edit",
			"blur div.project form.data" : "close",
		},

		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		edit: function () {
			$(this.el).addClass('editing');
		},

		remove: function () {
			$(this.el).remove();
		},

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		},

		updateOnEnter: function (event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.model.save({
				project_name: this.$('.project_name').val(),
				project_description: this.$('.project_description').val(),
				github_uri: this.$('.project_github_uri').val(),
			});
			$(this.el).removeClass('editing');
		}
	});


	// The main appview :)
	Webume.Views.AppView = Backbone.View.extend({
		el: $('#container'),

		events: {
			"click a#add-education" : "addNewEducationView",
			"click a#add-professional" : "addNewProfessionalView",
			"click a#add-skill" : "addNewSkillView",
			"click a#add-activity" : "addNewActivityView",
			"click a#add-project" : "addNewProjectView",
		},

		initialize: function () {
			// Fake some stuff
			Webume.Objects.Basics.bind('add', this.addOneBasics, this);
			Webume.Objects.Basics.bind('reset', this.addAllBasics, this);
			Webume.Objects.Basics.fetch();

			if (Webume.Objects.Basics.length < 1) {
				var basics = Webume.Objects.Basics.create({});
			}

			Webume.Objects.Education.bind('add', this.addOneEducation, this);
			Webume.Objects.Education.bind('reset', this.addAllEducation, this);
			Webume.Objects.Education.fetch();

			Webume.Objects.Professional.bind('add', this.addOneProfessional, this);
			Webume.Objects.Professional.bind('reset', this.addAllProfessional, this);
			Webume.Objects.Professional.fetch();

			Webume.Objects.Skills.bind('add', this.addOneSkill, this);
			Webume.Objects.Skills.bind('reset', this.addAllSkills, this);
			Webume.Objects.Skills.fetch();

			Webume.Objects.Activities.bind('add', this.addOneActivity, this);
			Webume.Objects.Activities.bind('reset', this.addAllActivities, this);
			Webume.Objects.Activities.fetch();

			Webume.Objects.Projects.bind('add', this.addOneProject, this);
			Webume.Objects.Projects.bind('reset', this.addAllProjects, this);
			Webume.Objects.Projects.fetch();
		},

		addOneBasics: function (Basics) {
			var view = new Webume.Views.BasicsView({model: Basics});
			this.$("#basics").append(view.render().el);
		},

		addAllBasics: function () {
			Webume.Objects.Basics.each(this.addOneBasics);
		},

		addBasics: function (Basics) {
			if (_.isUndefined(Basics)) {
				Webume.Objects.Basics.each(this.Basics);
			} else {
				var view = new Webume.Views.BasicsView({model: Basics});
				this.$("#basics").append(view.render().el);
			}
		},

		addOneEducation: function (Education) {
			var view = new Webume.Views.EducationView({model: Education});
			this.$("#education-list").append(view.render().el);
		},

		addAllEducation: function () {
			Webume.Objects.Education.each(this.addOneEducation);
		},

		addOneProfessional: function (Professional) {
			var view = new Webume.Views.ProfessionalView({model: Professional});
			this.$("#professional-list").append(view.render().el);
		},

		addAllProfessional: function () {
			Webume.Objects.Professional.each(this.addOneProfessional);
		},

		addOneSkill: function (Skill) {
			var view = new Webume.Views.SkillsView({model: Skill});
			this.$("#skill-list").append(view.render().el);
		},

		addAllSkills: function () {
			Webume.Objects.Skills.each(this.addOneSkill);
		},

		addOneActivity: function (Activity) {
			var view = new Webume.Views.ActivityView({model: Activity});
			this.$("#activity-list").append(view.render().el);
		},

		addAllActivities: function () {
			Webume.Objects.Activities.each(this.addOneSkill);
		},

		addOneProject: function (Project) {
			var view = new Webume.Views.ProjectView({model: Project});
			this.$("#project-list").append(view.render().el);
		},

		addAllProjects: function () {
			Webume.Objects.Projects.each(this.addOneProject);
		},

		addNewEducationView: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newEducation = Webume.Objects.Education.create({});
		},

		addNewProfessionalView: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newProfessional = Webume.Objects.Professional.create({});
		},

		addNewSkillView: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newSkill = Webume.Objects.Skills.create({});
		},

		addNewActivityView: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newActivity = Webume.Objects.Activities.create({});
		},

		addNewProjectView: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newProject = Webume.Objects.Projects.create({});
		},
	});
});
