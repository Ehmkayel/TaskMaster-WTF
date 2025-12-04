export const sidebarContainer = document.getElementById("sidebar-container");
if (sidebarContainer) {
  const sidebarHTML = `
        <div class="sidebar-container">
        </div>
      `;
  sidebarContainer.innerHTML = sidebarHTML;

  const sidebarService = new Sidebar();
  sidebarService.renderFullSidebar();
}

export async function loadStats() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export function renderStats(data) {
  if (!data) return;

  const statsSection = document.querySelector(".stats-data");
  if (statsSection && data.stats) {
    statsSection.innerHTML = data.stats
      .map(
        (item, index) => `
        <div key=${index} class="stat-card__container">
        <div class="stat-card">
        <div class="stat-card__header">
         <p class="stat-card__title">${item.label}</p>
         <div class="stat-card_icon" style="background-color: ${item.background}">
          <img src=${item.icon} alt="${item.label} icons"/>
        </div>
       </div>
       <div>

        <span class="stat-card__value">${item.value}</span>
        <p class="stat-card__sub">${item.subText}</p>
       </div>
      
        </div>
       
    
        </div>
    
    `
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadStats();
  console.log("Loaded data:", data);

  renderStats(data);
});
