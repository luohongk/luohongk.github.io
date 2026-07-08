document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

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
});



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
