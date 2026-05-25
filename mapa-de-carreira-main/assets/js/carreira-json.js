const DATA_URL = "assets/data/carreira.json";

const createElement = (tagName, className, textContent) => {
	const element = document.createElement(tagName);

	if (className) {
		element.className = className;
	}

	if (textContent) {
		element.textContent = textContent;
	}

	return element;
};

const createBadgeList = (items, ariaLabel) => {
	const list = createElement("ul", "list-inline");

	list.setAttribute("aria-label", ariaLabel);

	items.forEach((item) => {

		const listItem = createElement("li", "list-inline-item");

		const badge = createElement(
			"span",
			"badge bg-secondary badge-pill",
			item
		);

		listItem.appendChild(badge);

		list.appendChild(listItem);
	});

	return list;
};

const renderHeadMetadata = ({ seo, profile }) => {

	document.title = seo.title;

	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", seo.description);

	const photo = document.getElementById("profile-photo");

	photo.src = profile.photo;

	photo.alt = profile.photoAlt;
};

const renderProfile = ({ profile, contacts }) => {

	document.getElementById("profile-name").textContent =
		profile.name;

	document.getElementById("profile-headline").textContent =
		profile.headline;

	document.getElementById("profile-summary").textContent =
		profile.summary;

	const cvLink = document.getElementById("cv-link");

	cvLink.href = profile.cvUrl;

	const contactList =
		document.getElementById("contact-list");

	contactList.innerHTML = "";

	// Ícones SVG inline para cada tipo de contato
	const ICONS = {
		email: {
			cls: "contact-icon icon-email",
			svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`
		},
		github: {
			cls: "contact-icon icon-github",
			svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>`
		},
		linkedin: {
			cls: "contact-icon icon-linkedin",
			svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>`
		}
	};

	const getIconInfo = (url) => {
		if (url.startsWith("mailto:")) return ICONS.email;
		if (url.includes("github.com"))   return ICONS.github;
		if (url.includes("linkedin.com")) return ICONS.linkedin;
		return null;
	};

	contacts.forEach((contact) => {

		const listItem = createElement("li", "mb-2");

		const iconInfo = getIconInfo(contact.url);

		if (iconInfo) {
			const iconWrapper = document.createElement("a");
			iconWrapper.href = contact.url;
			iconWrapper.className = iconInfo.cls;
			iconWrapper.innerHTML = iconInfo.svg;
			iconWrapper.setAttribute("aria-hidden", "true");
			iconWrapper.tabIndex = -1;
			if (contact.url.startsWith("http")) {
				iconWrapper.target = "_blank";
				iconWrapper.rel = "noopener";
			}
			listItem.appendChild(iconWrapper);
		}

		const link = createElement(
			"a",
			"text-link",
			contact.label
		);

		link.href = contact.url;

		if (contact.url.startsWith("http")) {
			link.target = "_blank";
			link.rel = "noopener";
		}

		listItem.appendChild(link);

		contactList.appendChild(listItem);
	});
};

const renderCareerTimeline = (careerSteps) => {

	const timeline =
		document.getElementById("career-timeline");

	timeline.innerHTML = "";

	careerSteps.forEach((step, index) => {

		const article = createElement(
			"article",
			"resume-timeline-item position-relative pb-5"
		);

		const titleId = `career-step-${index + 1}`;

		article.setAttribute("aria-labelledby", titleId);

		const header = createElement(
			"div",
			"resume-timeline-item-header mb-2"
		);

		const title = createElement(
			"h3",
			"resume-position-title font-weight-bold mb-1",
			step.title
		);

		title.id = titleId;

		header.appendChild(title);

		const description = createElement(
			"div",
			"resume-timeline-item-desc"
		);

		description.appendChild(
			createElement("p", "", step.description)
		);

		description.appendChild(
			createElement(
				"h4",
				"resume-timeline-item-desc-heading font-weight-bold",
				"Soft skills exigidas para essa etapa"
			)
		);

		const softSkillList = createElement("ul");

		step.softSkills.forEach((skill) => {

			softSkillList.appendChild(
				createElement("li", "", skill)
			);
		});

		description.appendChild(softSkillList);

		description.appendChild(
			createElement(
				"h4",
				"resume-timeline-item-desc-heading font-weight-bold",
				"Roadmap de aprendizado"
			)
		);

		description.appendChild(
			createBadgeList(
				step.roadmap,
				`Tecnologias da etapa ${step.title}`
			)
		);

		article.appendChild(header);

		article.appendChild(description);

		timeline.appendChild(article);
	});
};

const renderSkills = ({ skillGroups, otherSkills }) => {

	const skillGroupsContainer =
		document.getElementById("skill-groups");

	skillGroupsContainer.innerHTML = "";

	skillGroups.forEach((group) => {

		const groupElement = createElement(
			"div",
			"resume-skill-item"
		);

		groupElement.appendChild(
			createElement(
				"h3",
				"resume-skills-cat font-weight-bold h5",
				group.title
			)
		);

		const list = createElement(
			"ul",
			"list-unstyled mb-4"
		);

		group.skills.forEach((skill) => {

			const item = createElement("li", "mb-2");

			item.appendChild(
				createElement(
					"div",
					"resume-skill-name",
					skill.name
				)
			);

			const progress = createElement(
				"div",
				"progress resume-progress"
			);

			const bar = createElement(
				"div",
				"progress-bar theme-progress-bar-dark"
			);

			bar.style.width = `${skill.level}%`;

			progress.appendChild(bar);

			item.appendChild(progress);

			list.appendChild(item);
		});

		groupElement.appendChild(list);

		skillGroupsContainer.appendChild(groupElement);
	});

	const otherSkillsList =
		document.getElementById("other-skills");

	otherSkillsList.innerHTML = "";

	otherSkills.forEach((skill) => {

		const item = createElement(
			"li",
			"list-inline-item"
		);

		item.appendChild(
			createElement(
				"span",
				"badge badge-light",
				skill
			)
		);

		otherSkillsList.appendChild(item);
	});
};

const renderLanguages = (languages) => {

	const languageList =
		document.getElementById("language-list");

	languageList.innerHTML = "";

	languages.forEach((language) => {

		const item = createElement("li", "mb-2");

		item.appendChild(
			createElement("strong", "", language.name)
		);

		item.append(" ");

		item.appendChild(
			createElement(
				"span",
				"text-muted",
				`(${language.level})`
			)
		);

		languageList.appendChild(item);
	});
};

const renderPage = (data) => {

	renderHeadMetadata(data);

	renderProfile(data);

	renderCareerTimeline(data.careerSteps);

	renderSkills(data);

	renderLanguages(data.languages);
};

fetch(DATA_URL)

	.then((response) => {

		if (!response.ok) {
			throw new Error(
				"Nao foi possivel carregar o JSON."
			);
		}

		return response.json();
	})

	.then(renderPage)

	.catch((error) => {

		console.error(error);
	});