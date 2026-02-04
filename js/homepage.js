  document.addEventListener("DOMContentLoaded", function () {
      const yearSpan = document.getElementById("current-year");
      yearSpan.textContent = new Date().getFullYear();
    });

    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("current-year").textContent = new Date().getFullYear();
      const loader = document.getElementById("loading-screen");
      if (loader) loader.style.display = "none";
    });

    fetch("notes.txt")
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById("notes-container");
      const lines = data.split("\n");

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed === "") return;

        // 正则匹配格式：图标路径 链接 说明（说明可以包含空格）
        const match = trimmed.match(/^(\S+)\s+(\S+)\s+(.+)$/);
        if (!match) return;

        const [_, iconPath, url, description] = match;

        const p = document.createElement("p");
        p.innerHTML = `
          <img src="${iconPath}" alt="icon"
               style="width: 16px; height: 16px; vertical-align: middle;margin-bottom=0px;">
          <a href="${url}" target="_blank">${description}</a>`;
        container.appendChild(p);
      });
    })
    .catch(error => {
      document.getElementById("notes-container").innerText = "⚠️ 无法加载笔记内容：" + error;
    });



    // JavaScript 代码
function toggleSearch() {
  const container = document.getElementById('searchContainer');
  const searchBox = document.getElementById('searchBox');
  
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
  const searchTerm = document.getElementById('searchBox').value.trim().toLowerCase();
  const notesContainer = document.getElementById('notesContainer');
  const allNotes = notesContainer.getElementsByTagName('p');
  const searchStats = document.getElementById('searchStats');
  
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
  const allNotes = notesContainer.getElementsByTagName('p');
  const searchStats = document.getElementById('searchStats');
  
  // 显示所有笔记
  for (let i = 0; i < allNotes.length; i++) {
    allNotes[i].style.display = 'block';
  }
  
  searchStats.textContent = `共 ${allNotes.length} 个笔记`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  showAllNotes();
});