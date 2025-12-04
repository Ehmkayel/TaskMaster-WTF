export async function loadSidebarData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading sidebar:", error);
    return null;
  }
}

export function renderSidebar(data) {
  if (!data) return;
  const profileSection = document.querySelector(".sidebar-container__profile");
  if (profileSection && data.user) {
    profileSection.innerHTML = `
      <div class="sidebar-container__profile--icon">${data.user.initials}</div>
      <div class="sidebar-container__profile--user">
        <p class="user-name">${data.user.name}</p>
        <p class="user-email">${data.user.email}</p>
      </div>
    `;
  }

  const navSection = document.querySelector(".sidebar-navigation");
  if (navSection && data.menu) {
    navSection.innerHTML = data.menu
      .map(
        (item, index) => `
        <div key=${index}>
          <a href="${item.href}" class="nav-item ${
          item.active ? "active" : ""
        }">
        <img src=${item.icons} alt="${item.label} icons"/>
        <span class="nav-label">${item.label}</span>
      
      </a>
        </div>
    
    `
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadSidebarData();
  renderSidebar(data);
});
