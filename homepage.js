const RESOURCE_VISIBLE_LIMIT = 4;
const RESOURCE_BADGE_LIMIT = 4;
const RESOURCE_BADGE_TONES = ["primary", "secondary", "tertiary", "quaternary"];

const RESOURCE_SERVICES = [
  {
    key: "api",
    category: "API",
    title: "Hongkun Luo API",
    description: "罗宏昆 AI API 分享网站，获取 API Key、查看额度与调用记录",
    url: "https://api.luohongkun.top/",
    icon: "🔑",
  },
  {
    key: "file",
    category: "FILE",
    title: "临时文件与粘贴",
    description: "临时文件上传、短期复制粘贴与跨设备内容转移",
    url: "https://file.luohongkun.top/",
    icon: "📎",
  },
  {
    key: "library",
    category: "LIBRARY",
    title: "个人资料分享库",
    description: "整理并分享个人资料、文档、工具与长期沉淀内容",
    url: "https://library.luohongkun.top/",
    icon: "📚",
  },
  {
    key: "latex",
    category: "LATEX",
    title: "在线 LaTeX 服务",
    description: "基于 Overleaf 改造的免费在线 LaTeX 编辑、编译与协作服务",
    url: "https://latex.luohongkun.top/",
    icon: "📝",
  },


];

function renderResourceServices() {
  const urlGroup = document.getElementById("resource-url-group");
  const badgeContainer = document.getElementById("resource-badge-container");
  const servicesContainer = document.getElementById("resource-services");
  if (!urlGroup || !badgeContainer || !servicesContainer) return;

  urlGroup.replaceChildren();
  RESOURCE_SERVICES.forEach(service => {
    const link = document.createElement("a");
    link.className = "browser-url";
    link.href = service.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = service.key;
    urlGroup.appendChild(link);
  });

  badgeContainer.replaceChildren();
  const categories = [...new Set(RESOURCE_SERVICES.map(service => service.category))];
  categories.slice(0, RESOURCE_BADGE_LIMIT).forEach((category, index) => {
    const badge = document.createElement("span");
    badge.className = `resource-badge ${RESOURCE_BADGE_TONES[index % RESOURCE_BADGE_TONES.length]}`;
    badge.textContent = category;
    badgeContainer.appendChild(badge);
  });

  if (categories.length > RESOURCE_BADGE_LIMIT || RESOURCE_SERVICES.length > RESOURCE_VISIBLE_LIMIT) {
    const moreBadge = document.createElement("span");
    moreBadge.className = "resource-badge more";
    moreBadge.textContent = categories.length > RESOURCE_BADGE_LIMIT
      ? `+${categories.length - RESOURCE_BADGE_LIMIT}`
      : "MORE";
    badgeContainer.appendChild(moreBadge);
  }

  servicesContainer.replaceChildren();
  servicesContainer.classList.toggle("is-scrollable", RESOURCE_SERVICES.length > RESOURCE_VISIBLE_LIMIT);

  RESOURCE_SERVICES.forEach(service => {
    const link = document.createElement("a");
    link.className = "service-item";
    link.href = service.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const icon = document.createElement("div");
    icon.className = "feature-icon";
    icon.textContent = service.icon;

    const content = document.createElement("div");
    content.className = "feature-content";

    const title = document.createElement("h5");
    title.textContent = service.title;

    const description = document.createElement("p");
    description.textContent = service.description;

    content.append(title, description);
    link.append(icon, content);
    servicesContainer.appendChild(link);
  });
}

function initHomepage() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  renderResourceServices();

  document.body.classList.add('loading-complete');

  const notesList = document.getElementById("notes-container");
  if (notesList) {
    fetch("notes.txt")
      .then(response => response.text())
      .then(data => {
        const lines = data.split("\n");

        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed === "") return;

          const match = trimmed.match(/^(\S+)\s+(\S+)\s+(.+)$/);
          if (!match) return;

          const [, iconPath, url, description] = match;

          const p = document.createElement("p");
          p.innerHTML = `
            <img src="${iconPath}" alt="icon" loading="lazy" decoding="async"
                 style="width: 16px; height: 16px; vertical-align: middle;margin-bottom=0px;">
            <a href="${url}" target="_blank">${description}</a>`;
          notesList.appendChild(p);
        });
      })
      .catch(error => {
        notesList.innerText = "⚠️ 无法加载笔记内容：" + error;
      });
  }

  showAllNotes();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomepage);
} else {
  initHomepage();
}



    // JavaScript 代码
function toggleSearch() {
  const container = document.getElementById('searchContainer');
  const searchBox = document.getElementById('searchBox');
  if (!container || !searchBox) return;
  
  if (container.style.display === 'none') {
    container.style.display = 'block';
    searchBox.focus();
  } else {
    container.style.display = 'none';
    searchBox.value = '';
    showAllNotes();
  }
}

function searchNotes() {
  const searchBox = document.getElementById('searchBox');
  const notesContainer = document.getElementById('notesContainer');
  const searchStats = document.getElementById('searchStats');
  if (!searchBox || !notesContainer || !searchStats) return;

  const searchTerm = searchBox.value.trim().toLowerCase();
  const allNotes = notesContainer.getElementsByTagName('p');
  
  let visibleCount = 0;
  
  // 遍历所有笔记条目
  for (let i = 0; i < allNotes.length; i++) {
    const note = allNotes[i];
    const noteText = note.textContent.toLowerCase();
    
    // 如果搜索框为空，显示所有项目
    if (searchTerm === '') {
      note.style.display = 'block';
      visibleCount++;
    } 
    // 如果包含搜索词，显示该项目
    else if (noteText.indexOf(searchTerm) !== -1) {
      note.style.display = 'block';
      visibleCount++;
    } 
    // 否则隐藏该项目
    else {
      note.style.display = 'none';
    }
  }
  
  // 更新搜索统计信息
  if (searchTerm === '') {
    searchStats.textContent = `共 ${allNotes.length} 个笔记`;
  } else {
    searchStats.textContent = `搜索"${searchTerm}"找到 ${visibleCount} 个结果`;
  }
}

function showAllNotes() {
  const notesContainer = document.getElementById('notesContainer');
  const searchStats = document.getElementById('searchStats');
  if (!notesContainer || !searchStats) return;

  const allNotes = notesContainer.getElementsByTagName('p');
  
  // 显示所有笔记
  for (let i = 0; i < allNotes.length; i++) {
    allNotes[i].style.display = 'block';
  }
  
  searchStats.textContent = `共 ${allNotes.length} 个笔记`;
}
