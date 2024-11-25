document.addEventListener("DOMContentLoaded", function () {
  let shortLinkCounter = 1;
  let links = [];
  let currentLinkId = 1; // 用于生成短链接ID

  // Function to show a specific section
  function showSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      section.classList.remove("visible");
      section.classList.add("hidden");
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove("hidden");
      targetSection.classList.add("visible");
    }
  }

  // Function to update the link table
  function updateLinkTable() {
    const tbody = document.getElementById("link-table").getElementsByTagName("tbody")[0];
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

  // Function to delete a link
  function deleteLink(id) {
    links = links.filter((link) => link.id !== id);
    updateLinkTable();
  }

  // Function to create a new short link
  document.getElementById("create-link-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const longUrl = document.getElementById("long-url").value;
    let shortUrl;
    if (document.getElementById("short-link-preview-custom")) {
      // 假设有一个自定义短链接输入的字段
      shortUrl = document.getElementById("short-link-preview-custom").value;
    } else {
      shortUrl = `http://to.localwu.top/${currentLinkId++}6k8xa`;
    }

    const newLink = { id: links.length + 1, longUrl, shortUrl };
    links.push(newLink);

    document.getElementById("short-link-preview").textContent = shortUrl;
    document.getElementById("long-url").value = "";
    showSection("manage-links"); // Optionally show the manage links section
    updateLinkTable();
  });

  // Initially show the Prepare section
  showSection("Prepare");

  // Sorting links (not strictly necessary in this example, but included for completeness)
  function sortLinks() {
    links.sort((a, b) => a.id - b.id);
    updateLinkTable();
  }

  // Import JSON functionality
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

  // Export JSON functionality
  function exportJson() {
    const jsonOutput = JSON.stringify(links, null, 2);
    document.getElementById("json-output").value = jsonOutput;
  }

  // Attaching event listeners for sorting and JSON import/export (if needed)
  // document.getElementById("sort-button").addEventListener("click", sortLinks);
  // document.getElementById("import-button").addEventListener("click", importJson);
  // document.getElementById("export-button").addEventListener("click", exportJson);
});
