/*
 * @Author: Hongkun Luo
 * @Date: 2024-10-17 15:26:05
 * @LastEditors: Hongkun Luo（罗宏昆） luohongkun@whu.edu.cn
 * @Description: scholar/index.html 专属交互脚本
 *
 * 包含：
 *   1. 联系弹窗（微信 / QQ / Gmail / 学校邮箱 / 专业咨询 / Coffee Chat / 摘要预览）
 *   2. 论文 Tab 切换 & 按时间排序
 *   3. 背景音乐控制
 *   4. 页脚当前日期
 *   5. 平滑滚动 & 按钮点击效果
 *   6. Google Analytics
 */

/* ============================================================
 * 零、Google Analytics
 * ============================================================ */

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-88572407-1', 'auto');
ga('send', 'pageview');

/* ============================================================
 * 一、弹窗工具函数
 * ============================================================ */

/**
 * 通过 id 打开弹窗（供 HTML onclick 直接调用）
 * @param {string} modalId
 */
window.openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) showModal(modal);
};

/**
 * 通过 id 关闭弹窗（供 HTML onclick 直接调用）
 * @param {string} modalId
 */
window.closeModalById = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) closeModal(modal);
};

/**
 * 显示指定弹窗
 * @param {HTMLElement} modal
 */
function showModal(modal) {
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * 关闭指定弹窗
 * @param {HTMLElement} modal
 */
function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => (modal.style.display = 'none'), 300);
}

/**
 * 复制文字到剪贴板并更新按钮文本（中文提示）
 * @param {string} text
 * @param {HTMLButtonElement} btn
 */
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '复制成功！';
    btn.style.opacity = '0.9';
    setTimeout(() => { btn.textContent = orig; btn.style.opacity = '1'; }, 1500);
  }).catch(() => alert('复制失败，请手动复制：' + text));
}

/**
 * 复制文字到剪贴板并更新按钮文本（英文提示）
 * @param {string} text
 * @param {HTMLButtonElement} btn
 */
function copyEnglishText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copy Success！';
    btn.style.opacity = '0.9';
    setTimeout(() => { btn.textContent = orig; btn.style.opacity = '1'; }, 1500);
  }).catch(() => alert('Copy Failed, Please Manually Copy: ' + text));
}

/* ============================================================
 * 二、摘要预览弹窗（全局函数，供 HTML onclick 调用）
 * ============================================================ */

/**
 * 从触发元素的 data-title / data-abstract 属性中读取内容并展示弹窗
 * @param {HTMLElement} element  触发元素
 */
window.showAbstract = function (element) {
  const title    = element.getAttribute('data-title');
  const abstract = element.getAttribute('data-abstract');
  const modal    = document.getElementById('abstractModal');
  const body     = document.getElementById('abstractModalBody');

  if (title && abstract && modal && body) {
    body.innerHTML = `
      <h3 style="color:#224B8D;margin-bottom:15px;font-size:16px;">${title}</h3>
      <p style="line-height:1.8;color:#4E5969;font-size:14px;">${abstract}</p>
    `;
    showModal(modal);
  }
};

/* ============================================================
 * 三、论文 Tab 切换
 * ============================================================ */

/**
 * 切换到指定 Tab（由 HTML onclick 调用）
 * @param {string} tabName  Tab 容器的 id
 */
window.switchTab = function (tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  const selected = document.getElementById(tabName);
  if (selected) selected.classList.add('active');

  // event 由浏览器在 onclick 触发时注入
  if (event && event.target) event.target.classList.add('active');
};

/* ============================================================
 * 四、初始化所有联系弹窗
 * ============================================================ */

function initContactModals() {
  // ---------- 微信弹窗 ----------
  const wechatLink    = document.getElementById('wechatLink');
  const wechatModal   = document.getElementById('wechatModal');
  const wechatConfirm = document.getElementById('modalConfirm');
  const wechatCancel  = document.getElementById('modalCancel');

  if (wechatLink && wechatModal) {
    wechatLink.addEventListener('click', (e) => { e.preventDefault(); showModal(wechatModal); });
    wechatCancel.addEventListener('click',  () => closeModal(wechatModal));
    wechatConfirm.addEventListener('click', () => { closeModal(wechatModal); window.open('../images/wechat_code.png', '_blank'); });
    wechatModal.addEventListener('click',   (e) => e.target === wechatModal && closeModal(wechatModal));
  }

  // ---------- QQ 弹窗 ----------
  const qqLink    = document.getElementById('qqLink');
  const qqModal   = document.getElementById('qqModal');
  const qqConfirm = document.getElementById('qqModalConfirm');
  const qqCancel  = document.getElementById('qqModalCancel');

  if (qqLink && qqModal) {
    qqLink.addEventListener('click', (e) => { e.preventDefault(); showModal(qqModal); });
    qqCancel.addEventListener('click',  () => closeModal(qqModal));
    qqConfirm.addEventListener('click', () => { closeModal(qqModal); window.open('../images/qq_num.png', '_blank'); });
    qqModal.addEventListener('click',   (e) => e.target === qqModal && closeModal(qqModal));
  }

  // ---------- Gmail 弹窗 ----------
  const gmailLink    = document.getElementById('gmailLink');
  const gmailModal   = document.getElementById('gmailModal');
  const gmailConfirm = document.getElementById('gmailModalConfirm');
  const gmailCancel  = document.getElementById('gmailModalCancel');
  const copyGmailBtn   = document.getElementById('copyGmail');
  const copyGmailEnBtn = document.getElementById('copyGmailEn');
  const gmailAddress   = document.getElementById('gmailText') ? document.getElementById('gmailText').textContent : '';

  if (gmailLink && gmailModal) {
    gmailLink.addEventListener('click',  () => showModal(gmailModal));
    gmailCancel.addEventListener('click',  () => closeModal(gmailModal));
    gmailConfirm.addEventListener('click', () => closeModal(gmailModal));
    gmailModal.addEventListener('click',   (e) => e.target === gmailModal && closeModal(gmailModal));
    if (copyGmailBtn)   copyGmailBtn.addEventListener('click',   () => copyText(gmailAddress, copyGmailBtn));
    if (copyGmailEnBtn) copyGmailEnBtn.addEventListener('click', () => copyEnglishText(gmailAddress, copyGmailEnBtn));
  }

  // ---------- 学校邮箱弹窗 ----------
  const schoolMailLink    = document.getElementById('schoolMailLink');
  const schoolMailModal   = document.getElementById('schoolMailModal');
  const schoolMailConfirm = document.getElementById('schoolMailModalConfirm');
  const schoolMailCancel  = document.getElementById('schoolMailModalCancel');
  const copySchoolBtn     = document.getElementById('copySchoolMail');
  const copySchoolEnBtn   = document.getElementById('copySchoolMailEn');
  const schoolAddress     = document.getElementById('schoolMailText') ? document.getElementById('schoolMailText').textContent : '';

  if (schoolMailLink && schoolMailModal) {
    schoolMailLink.addEventListener('click',  () => showModal(schoolMailModal));
    schoolMailCancel.addEventListener('click',  () => closeModal(schoolMailModal));
    schoolMailConfirm.addEventListener('click', () => closeModal(schoolMailModal));
    schoolMailModal.addEventListener('click',   (e) => e.target === schoolMailModal && closeModal(schoolMailModal));
    if (copySchoolBtn)   copySchoolBtn.addEventListener('click',   () => copyText(schoolAddress, copySchoolBtn));
    if (copySchoolEnBtn) copySchoolEnBtn.addEventListener('click', () => copyEnglishText(schoolAddress, copySchoolEnBtn));
  }

  // ---------- 专业咨询弹窗 ----------
  const consultTrigger = document.getElementById('consultTrigger');
  const consultModal   = document.getElementById('consultModal');
  const consultConfirm = document.getElementById('consultModalConfirm');
  const consultCancel  = document.getElementById('consultModalCancel');

  if (consultTrigger && consultModal) {
    consultTrigger.addEventListener('click', () => showModal(consultModal));
    consultCancel.addEventListener('click',  () => closeModal(consultModal));
    consultConfirm.addEventListener('click', () => closeModal(consultModal));
    consultModal.addEventListener('click',   (e) => e.target === consultModal && closeModal(consultModal));
  }

  // ---------- Coffee Chat 弹窗 ----------
  const chatTrigger = document.getElementById('chatTrigger');
  const chatModal   = document.getElementById('chatModal');
  const chatConfirm = document.getElementById('chatModalConfirm');
  const chatCancel  = document.getElementById('chatModalCancel');

  if (chatTrigger && chatModal) {
    chatTrigger.addEventListener('click', () => showModal(chatModal));
    chatCancel.addEventListener('click',  () => closeModal(chatModal));
    chatConfirm.addEventListener('click', () => closeModal(chatModal));
    chatModal.addEventListener('click',   (e) => e.target === chatModal && closeModal(chatModal));
  }

  // ---------- 摘要预览弹窗关闭按钮 ----------
  const abstractModal   = document.getElementById('abstractModal');
  const abstractConfirm = document.getElementById('abstractModalConfirm');

  if (abstractConfirm) abstractConfirm.addEventListener('click', () => closeModal(abstractModal));
  if (abstractModal)   abstractModal.addEventListener('click', (e) => e.target === abstractModal && closeModal(abstractModal));
}

/* ============================================================
 * 五、初始化论文 Tab 内容（将 pubTable 按类别/时间分发到各 Tab）
 * ============================================================ */

function initPubTabs() {
  const table = document.getElementById('pubTable');
  if (!table) return;

  const tbodies = table.querySelectorAll('tbody');

  let allContent        = '';
  let firstAuthorContent = '';
  let coAuthoredContent  = '';
  let projectsContent    = '';
  let allPapers          = [];
  let currentSection     = 'first-author';

  tbodies.forEach(tbody => {
    const text = tbody.textContent;

    if (text.includes('My first author papers')) {
      currentSection     = 'first-author';
      firstAuthorContent += tbody.outerHTML;
      allContent         += tbody.outerHTML;
    } else if (text.includes('My co-authored papers')) {
      currentSection    = 'co-authored';
      coAuthoredContent += tbody.outerHTML;
      allContent        += tbody.outerHTML;
    } else if (text.includes('My selected projects')) {
      currentSection  = 'projects';
      projectsContent += tbody.outerHTML;
      allContent      += tbody.outerHTML;
    } else {
      // 提取时间（格式：2025.03）
      const dateMatch = text.match(/(\d{4}\.\d{2})/);
      let yearValue = 0, monthValue = 0, dateValue = '';
      if (dateMatch) {
        const [year, month] = dateMatch[1].split('.');
        yearValue  = parseInt(year);
        monthValue = parseInt(month);
        dateValue  = dateMatch[1];
      }

      allPapers.push({ html: tbody.outerHTML, section: currentSection, year: yearValue, month: monthValue, date: dateValue });

      if      (currentSection === 'first-author') firstAuthorContent += tbody.outerHTML;
      else if (currentSection === 'co-authored')  coAuthoredContent  += tbody.outerHTML;
      else if (currentSection === 'projects')     projectsContent    += tbody.outerHTML;
      allContent += tbody.outerHTML;
    }
  });

  const wrap = (inner) => `<table width="100%" align="center" class="table_background">${inner}</table>`;

  document.getElementById('all').innerHTML          = wrap(allContent);
  document.getElementById('first-author').innerHTML = wrap(firstAuthorContent);
  document.getElementById('co-authored').innerHTML  = wrap(coAuthoredContent);
  document.getElementById('projects').innerHTML     = wrap(projectsContent);

  // 按时间降序排序
  allPapers.sort((a, b) => a.year !== b.year ? b.year - a.year : b.month - a.month);

  let byTimeContent = '';
  let currentYear   = null;
  allPapers.forEach(paper => {
    if (paper.year !== 0 && paper.year !== currentYear) {
      currentYear    = paper.year;
      byTimeContent += '<tbody><tr><td colspan="2"><div class="border-line"></div></td></tr></tbody>';
      byTimeContent += `<tbody><tr><td colspan="2" style="padding:15px 0 5px 0;"><h3 style="color:#224B8D;font-size:14px;font-weight:bold;margin:0;">⭐️ ${currentYear}</h3></td></tr></tbody>`;
    }
    byTimeContent += paper.html;
  });

  document.getElementById('by-time').innerHTML = wrap(byTimeContent);

  // 移除原始隐藏表格
  table.remove();
}

/* ============================================================
 * 六、背景音乐控制
 * ============================================================ */

function initBgMusic() {
  const bgMusic     = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  if (!bgMusic || !musicToggle) return;

  const musicIcon = musicToggle.querySelector('img');
  let isPlaying   = false;
  bgMusic.volume  = 0.5;

  musicToggle.addEventListener('click', function () {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.classList.remove('music-playing');
    } else {
      bgMusic.play();
      musicIcon.classList.add('music-playing');
    }
    isPlaying = !isPlaying;
  });
}

/* ============================================================
 * 七、页脚当前日期
 * ============================================================ */

function initFooterDate() {
  const el = document.getElementById('current-date');
  if (!el) return;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = new Date().toLocaleDateString('en-US', options);
}

/* ============================================================
 * 八、平滑滚动 & 按钮点击效果
 * ============================================================ */

const SCROLL_OFFSET = 76; // 导航栏偏移量，可根据需要调整

/**
 * 平滑滚动到指定锚点
 * @param {string} target - 目标元素的选择器（如 "#section"）
 */
function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
}

/**
 * 为按钮添加短暂点击视觉反馈
 * @param {HTMLElement} button
 */
function buttonClick(button) {
  button.classList.add('clicked');
  setTimeout(() => button.classList.remove('clicked'), 200);
}

/* ============================================================
 * 十、汉堡菜单（移动端导航）
 * ============================================================ */

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  // 切换开关
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // 点任意导航按钮后自动收起菜单
  navMenu.querySelectorAll('.button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

/* ============================================================
 * 九、DOMContentLoaded 统一初始化入口
 * ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initContactModals();
  initPubTabs();
  initBgMusic();
  initFooterDate();
  initHamburgerMenu();
});
