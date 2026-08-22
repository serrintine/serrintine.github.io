const toggleBtn = document.getElementById('theme-toggle');

// Check for saved preference or system preference on load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
} else if (prefersDark) {
  document.documentElement.setAttribute('data-theme', dark);
  toggleBtn.textContent = '☀️ Light Mode';
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let newTheme = 'light';
  
  if (currentTheme !== 'dark') {
    newTheme = 'dark';
    toggleBtn.textContent = '☀️ Light Mode';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
  }
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});