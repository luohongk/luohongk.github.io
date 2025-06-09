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