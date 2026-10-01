(() => {
  const KEY = "assemblyResidentGuideV1";
  const defaults = {
    title: "현재 집회 안내",
    summary: "주민 여러분의 안전하고 편리한 통행을 위해 현장 정보를 안내합니다.",
    place: "김포시 ○○로 일대",
    start: "2026-10-01T14:00",
    end: "2026-10-01T18:00",
    march: "없음",
    pedestrian: "현재 등록된 안내가 없습니다.",
    traffic: "현재 등록된 안내가 없습니다.",
    noise: "집회 현장의 소음은 관계 법령 및 현장 여건에 따라 관리됩니다.",
    police: "주민 불편과 안전사고 예방을 위해 현장 상황에 따라 필요한 조치를 실시합니다.",
    map: ""
  };

  const ids = ["title","summary","place","start","end","march","pedestrian","traffic","noise","police","map"];
  const $ = id => document.getElementById(id + "Input");

  function getData() {
    try { return { ...defaults, ...(JSON.parse(localStorage.getItem(KEY) || "{}")) }; }
    catch { return { ...defaults }; }
  }

  function fill() {
    const data = getData();
    ids.forEach(id => { if ($(id)) $(id).value = data[id] || ""; });
  }

  document.getElementById("adminForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = {};
    ids.forEach(id => data[id] = $(id).value);
    localStorage.setItem(KEY, JSON.stringify(data));
    document.getElementById("saveMessage").textContent = "저장되었습니다. 주민 화면에서 확인하세요.";
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("초기값으로 복원할까요?")) return;
    localStorage.setItem(KEY, JSON.stringify(defaults));
    fill();
    document.getElementById("saveMessage").textContent = "초기값으로 복원했습니다.";
  });

  const pageUrl = location.href.replace(/admin\.html.*$/, "index.html");
  document.getElementById("pageUrl").textContent = pageUrl;

  document.getElementById("copyUrlBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      document.getElementById("saveMessage").textContent = "주민용 주소를 복사했습니다.";
    } catch {
      alert(pageUrl);
    }
  });

  fill();
})();
