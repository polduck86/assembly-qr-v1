const DEFAULT_DATA = {
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

const STORAGE_KEY = "assemblyResidentGuideV1";

function getData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : { ...DEFAULT_DATA };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatDateTime(value) {
  if (!value) return "정보 없음";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function renderResident() {
  const data = getData();
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "정보 없음";
  };
  set("title", data.title);
  set("summary", data.summary);
  set("place", data.place);
  set("time", `${formatDateTime(data.start)} ~ ${formatDateTime(data.end)}`);
  set("march", data.march);
  set("pedestrian", data.pedestrian);
  set("traffic", data.traffic);
  set("noise", data.noise);
  set("police", data.police);

  const link = document.getElementById("mapLink");
  if (link) {
    if (data.map && /^https?:\/\//i.test(data.map)) {
      link.href = data.map;
      link.classList.remove("hidden");
    } else {
      link.classList.add("hidden");
    }
  }
}

if (document.getElementById("title")) renderResident();
