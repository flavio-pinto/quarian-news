// Header
const header = document.createElement('header');
header.classList.add('bg-dark', 'p-2', 'border-bottom', 'border-white');

// Navbar
const navbar = document.createElement('nav');
navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-dark', 'container', 'fs-1');


const brand = document.createElement('a');
brand.classList.add('navbar-brand');
brand.href = '#';

const brandName = document.createElement('h1');
brandName.classList.add('h2', 'm-0', 'fs-1', 'fw-bold');
brandName.textContent = 'Quarian.news';
brand.appendChild(brandName);

navbar.appendChild(brand);

// Navbar hamburger
const toggler = document.createElement('button');
toggler.classList.add('navbar-toggler');
toggler.type = 'button';
toggler.setAttribute('data-bs-toggle', 'collapse');
toggler.setAttribute('data-bs-target', '#navbarNav');
toggler.setAttribute('aria-controls', 'navbarNav');
toggler.setAttribute('aria-expanded', 'false');
toggler.setAttribute('aria-label', 'Toggle navigation');
toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
navbar.appendChild(toggler);

// Navbar menu container
const menuContainer = document.createElement('div');
menuContainer.classList.add('collapse', 'navbar-collapse');
menuContainer.id = 'navbarNav';

// Navbar social
const socialLinks = [
  { icon: 'code-square', text: 'My Website', url: '#' },
  { icon: 'github', text: 'GitHub', url: '#' },
  { icon: 'linkedin', text: 'LinkedIn', url: '#' }
];

const socialList = document.createElement('ul');
socialList.classList.add('navbar-nav', 'ms-auto');

for (const link of socialLinks) {
  const listItem = document.createElement('li');
  listItem.classList.add('nav-item', 'ms-lg-3');

  const anchor = document.createElement('a');
  anchor.classList.add('nav-link');
  anchor.href = link.url;

  const icon = document.createElement('i');
  icon.classList.add('bi', `bi-${link.icon}`, 'me-2', 'me-lg-0', 'align-middle');
  anchor.appendChild(icon);

  const textSpan = document.createElement('span');
  textSpan.classList.add('d-lg-none', 'ms-2', 'fs-4', 'align-middle');
  textSpan.textContent = link.text;
  anchor.appendChild(textSpan);

  listItem.appendChild(anchor);
  socialList.appendChild(listItem);
}

menuContainer.appendChild(socialList);
navbar.appendChild(menuContainer);
header.appendChild(navbar);

// Eseguo appen dell'header al body
let script = document.querySelector("script");
document.body.insertBefore(header, script);