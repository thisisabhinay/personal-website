const $ = (name) => document.querySelector(`[data-comp="${name}"]`);

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];

let header = null;
let navMenu = null;
let sunIcon = null;
let moonIcon = null;
let dayText = null;
let nightText = null;
let darkToggle = null;
let openMenuBtn = null;
let closeMenuBtn = null;
let mobileMenuBg = null;
let scrollController = null;

function cacheElements() {
	header = $("header");
	navMenu = $("nav-menu");
	sunIcon = $("sun-icon");
	moonIcon = $("moon-icon");
	dayText = $("day-text");
	nightText = $("night-text");
	darkToggle = $("dark-toggle");
	openMenuBtn = $("open-menu-btn");
	closeMenuBtn = $("close-menu-btn");
	mobileMenuBg = $("mobile-menu-bg");
}

function setTheme(isDark, animate) {
	const incoming = isDark ? moonIcon : sunIcon;
	const outgoing = isDark ? sunIcon : moonIcon;
	const showText = isDark ? nightText : dayText;
	const hideText = isDark ? dayText : nightText;

	incoming.classList.remove("setting");
	outgoing.classList.remove("rising");

	let timeout = 0;
	if (animate) {
		timeout = 500;
		outgoing.classList.add("setting");
	}

	setTimeout(() => {
		showText.classList.remove("hidden");
		hideText.classList.add("hidden");
		outgoing.classList.add("hidden");
		incoming.classList.remove("hidden");
		if (animate) {
			document.documentElement.classList.toggle("dark", isDark);
			incoming.classList.add("rising");
		}
	}, timeout);
}

function evaluateHeaderPosition() {
	if (window.scrollY > 16) {
		header.firstElementChild.classList.add(...stickyClassesContainer);
		header.firstElementChild.classList.remove(...unstickyClassesContainer);
		header.classList.add(...stickyClasses);
		header.classList.remove(...unstickyClasses);
	} else {
		header.firstElementChild.classList.remove(...stickyClassesContainer);
		header.firstElementChild.classList.add(...unstickyClassesContainer);
		header.classList.add(...unstickyClasses);
		header.classList.remove(...stickyClasses);
	}
}

function stickyHeaderFunctionality() {
	if (scrollController) scrollController.abort();
	scrollController = new AbortController();
	window.addEventListener(
		"scroll",
		() => {
			evaluateHeaderPosition();
		},
		{ signal: scrollController.signal },
	);
}

function applyMenuItemClasses() {
	const menuItems = navMenu.querySelectorAll("a");
	for (const item of menuItems) {
		if (item.pathname === window.location.pathname) {
			item.classList.add("text-neutral-900", "dark:text-white");
		}
	}
}

function openMobileMenu() {
	openMenuBtn.classList.add("hidden");
	closeMenuBtn.classList.remove("hidden");
	navMenu.classList.remove("hidden");
	mobileMenuBg.classList.add("opacity-0");
	mobileMenuBg.classList.remove("hidden");

	setTimeout(() => {
		mobileMenuBg.classList.remove("opacity-0");
	}, 1);
}

function closeMobileMenu() {
	closeMenuBtn.classList.add("hidden");
	openMenuBtn.classList.remove("hidden");
	navMenu.classList.add("hidden");
	mobileMenuBg.classList.add("hidden");
}

document.addEventListener("astro:page-load", () => {
	cacheElements();

	const isDark =
		localStorage.getItem("dark_mode") &&
		localStorage.getItem("dark_mode") === "true";
	setTheme(isDark, false);

	stickyHeaderFunctionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();

	openMenuBtn.addEventListener("click", () => {
		openMobileMenu();
	});

	closeMenuBtn.addEventListener("click", () => {
		closeMobileMenu();
	});

	mobileMenuBg.addEventListener("click", () => {
		closeMobileMenu();
	});

	darkToggle.addEventListener("click", () => {
		document.documentElement.classList.add("duration-300");

		if (document.documentElement.classList.contains("dark")) {
			localStorage.removeItem("dark_mode");
			setTheme(false, true);
		} else {
			localStorage.setItem("dark_mode", true);
			setTheme(true, true);
		}
	});
});
