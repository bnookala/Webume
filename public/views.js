$(window).load(function() {
	if (_.isUndefined(window.Webume)) {
		window.Webume = {};
	}

	if (_.isUndefined(Webume.Views)) {
		Webume.Views = {};
	}

	Webume.Views.Generic = Backbone.View.extend({
		initialize: function () {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		remove: function () {
			$(this.el).remove();
		},

		render: function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
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

		destroy: function (event) {
			event.preventDefault();
			event.stopPropagation();
			this.model.destroy();
		}
	});

	Webume.Views.Basics = Webume.Views.Generic.extend({
		tagName: "div",
		template: _.template($('#basics-template').html()),

		events: {
			"keypress form#basic_info_input"      : "updateOnEnter",
			"click form#basic_info_input" : "edit",
			"blur form#basic_info_input" : "close",
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
	});

	// Render the view for education objects
	Webume.Views.Education = Webume.Views.Generic.extend({
		tagName: "li",
		template: _.template($('#education-template').html()),

		events: {
			"click a.destroy-education": "destroy",
			"keypress div.education form.data" : "updateOnEnter",
			"click div.education form.data" : "edit",
			"blur div.education form.data" : "close"
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
	
	Webume.Views.Professional = Webume.Views.Generic.extend({
		tagName: "li",
		template: _.template($('#professional-template').html()),

		events: {
			"click a.destroy-professional": "destroy",
			"keypress div.professional form.data" : "updateOnEnter",
			"click div.professional form.data" : "edit",
			"blur div.professional form.data" : "close",
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

	Webume.Views.Skill = Webume.Views.Generic.extend({
		tagName: "li",
		template: _.template($('#skill-template').html()),

		events: {
			"click a.destroy-skill": "destroy",
			"keypress div.skill form.data" : "updateOnEnter",
			"click div.skill form.data" : "edit",
			"blur div.skill form.data" : "close",
		},

		close: function () {
			this.model.save({
				type: this.$('.skill_type').val(),
				skills: this.$('.skills').val(),
			});
			$(this.el).removeClass('editing');
		}
	});


	Webume.Views.Activity = Webume.Views.Generic.extend({
		tagName: "li",
		template: _.template($("#activity-template").html()),

		events: {
			"click a.destroy-activity": "destroy",
			"keypress div.activity form.data" : "updateOnEnter",
			"click div.activity form.data" : "edit",
			"blur div.activity form.data" : "close",
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

	Webume.Views.Project = Webume.Views.Generic.extend({
		tagName: "li",
		template: _.template($("#project-template").html()),

		events: {
			"click a.destroy-project": "destroy",
			"keypress div.project form.data" : "updateOnEnter",
			"click div.project form.data" : "edit",
			"blur div.project form.data" : "close",
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
	Webume.Views.App = Backbone.View.extend({
		el: $('#container'),

		events: {
			"click a#add-education" : "addNewEducation",
			"click a#add-professional" : "addNewProfessional",
			"click a#add-skill" : "addNewSkill",
			"click a#add-activity" : "addNewActivity",
			"click a#add-project" : "addNewProject",
		},

		modules: [
			Webume.Objects.Professional,
			Webume.Objects.Skills,
			Webume.Objects.Activities,
			Webume.Objects.Projects,
			Webume.Objects.Education,
		],

		types: {
			'basic': {
				object: Webume.Objects.Basics,
				el: this.$("#basics")
			},
			'education': {
				object: Webume.Objects.Education,
				el: this.$("#education-list")
			},
			'professional': {
				object: Webume.Objects.Professional,
				el: this.$("#professional-list")
			},
			'skill': {
				object: Webume.Objects.Skills,
				el: this.$("#skill-list")
			},
			'activity': {
				object: Webume.Objects.Activities,
				el: this.$("#activity-list")
			},
			'project': {
				object: Webume.Objects.Projects,
				el: this.$("#project-list")
			}
		},

		initialize: function () {
			// Fake some stuff
			Webume.Objects.Basics.bind('add', $.proxy(this.addOne, this));
			Webume.Objects.Basics.bind('reset', $.proxy(this.addAll, this));
			Webume.Objects.Basics.fetch();

			if (Webume.Objects.Basics.length < 1) {
				var basics = Webume.Objects.Basics.create({});
			}

			var app = this;
			$.each(this.modules, function(index, module) {
				module.bind('add', app.addOne, app);
				module.bind('reset', app.addAll, app);
				module.fetch();
			});
		},

		addOne: function (generic) {
			var type = this.types[generic.type];
			var view = undefined;
			switch (generic.type) {
			case 'basic':
				view = new Webume.Views.Basics({model: generic});
				break;
			case 'education':
				view = new Webume.Views.Education({model: generic});
				break;
			case 'professional':
				view = new Webume.Views.Professional({model: generic});
				break;
			case 'skill':
				view = new Webume.Views.Skill({model: generic});
				break;
			case 'activity':
				view = new Webume.Views.Activity({model: generic});
				break;
			case 'project':
				view = new Webume.Views.Project({model: generic});
				break;
			}
			type.el.append(view.render().el);
		},

		addAll: function (generics) {
			generics.each($.proxy(this.addOne, this));
		},

		addNewEducation: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newEducation = Webume.Objects.Education.create({});
		},

		addNewProfessional: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newProfessional = Webume.Objects.Professional.create({});
		},

		addNewSkill: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newSkill = Webume.Objects.Skills.create({});
		},

		addNewActivity: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newActivity = Webume.Objects.Activities.create({});
		},

		addNewProject: function (event) {
			event.preventDefault();
			event.stopPropagation();
			var newProject = Webume.Objects.Projects.create({});
		},
	});

	Webume.App = new Webume.Views.App;
});
