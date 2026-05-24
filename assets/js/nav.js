// Shared navigation utility — Khaled Sanad Portfolio
// Provides safe in-page view switching for artefacts.
// Rules:
//   - Never calls history.pushState, history.back, or location.href
//   - All navigation is DOM class toggling only
//   - Call switchView(showId, hideIds) to switch between sibling views

function switchView(showId, hideIds) {
  const show = document.getElementById(showId);
  if (show) {
    show.classList.remove('hidden');
    show.classList.add('active');
  }
  hideIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
      el.classList.remove('active');
    }
  });
}
