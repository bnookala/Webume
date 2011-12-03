$(window).load(function() {
	if (_.isUndefined(Webume.Objects)) {
		Webume.Objects = {};
	}

	Webume.Objects.Education = new Webume.Collections.EducationList;
	Webume.Objects.Professional = new Webume.Collections.ProfessionalList;
	Webume.Objects.Basics = new Webume.Collections.BasicsList;
	Webume.Objects.Skills = new Webume.Collections.SkillList;
	Webume.Objects.Activities = new Webume.Collections.ActivityList;
	Webume.Objects.Projects = new Webume.Collections.ProjectList;
});
