// JavaScript to handle the front-end interactions

// Simulated short link generation (just for demonstration)
let shortLinkCounter = 1;

// Storage for links (simulated database)
let links = [];

// Function to show a specific section
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("visible");
    section.classList.add("hidden");
  });

  const targetSection = document.getElementById(sectionId);
  targetSection.classList.remove("hidden");
  targetSection.classList.add("visible");
}

// Function to create a new short link
document
  .getElementById("create-link-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const longUrl = document.getElementById("long-url").value;
    const shortUrl = `http://to.localwu.top/${shortLinkCounter++}er35s6`;

    links.push({ id: links.length + 1, longUrl, shortUrl });

    document.getElementById("short-link-preview").textContent = shortUrl;

    // Optionally, you could clear the input field here
    // document.getElementById('long-url').value = '';

    // Update the table with the new link (this part is optional, as we're not displaying it initially)
    // updateLinkTable();
  });

// Function to sort links (by ID in this case

document.addEventListener("DOMContentLoaded", () => {
  // 初始化链接列表
  const links = [];
  let currentLinkId = 1;

  // 显示特定部分
  function showSection(sectionId) {
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
  }

  // 创建新链接
  document
    .getElementById("create-link-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const longUrl = document.getElementById("long-url").value;
      const shortUrl = `http://to.localwu.top/${currentLinkId}6k8xa`;
      const newLink = { id: currentLinkId, longUrl, shortUrl };
      links.push(newLink);
      currentLinkId++;
      updateLinkTable();
      document.getElementById("long-url").value = "";
      document.getElementById("short-link-preview").textContent = shortUrl;
      showSection("manage-links"); // 创建后自动跳转到管理链接页面
    });

  // 更新链接表
  function updateLinkTable() {
    const tbody = document
      .getElementById("link-table")
      .getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    links.forEach((link) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${link.id}</td>
                <td>${link.longUrl}</td>
                <td>${link.shortUrl}</td>
                <td><button onclick="deleteLink(${link.id})">Delete</button></td>
            `;
      tbody.appendChild(row);
    });
  }

  // 删除链接
  function deleteLink(id) {
    links = links.filter((link) => link.id !== id);
    updateLinkTable();
  }

  // 排序链接
  function sortLinks() {
    links.sort((a, b) => a.id - b.id);
    updateLinkTable();
  }

  // 导入JSON
  function importJson() {
    const jsonInput = document.getElementById("json-input").value;
    try {
      const importedLinks = JSON.parse(jsonInput);
      links.splice(0, links.length, ...importedLinks);
      currentLinkId = links.length ? links[links.length - 1].id + 1 : 1;
      updateLinkTable();
    } catch (e) {
      alert("Invalid JSON format!");
    }
  }

  // 导出JSON
  function exportJson() {
    const jsonOutput = JSON.stringify(links, null, 2);
    document.getElementById("json-output").value = jsonOutput;
  }
});
