const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, "../app/event.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const current = JSON.parse(fs.readFileSync(path.join(__dirname, "../content/events/2026-autumn-workshop.json"), "utf8"));

function loadEvent(data, slug = data.slug) {
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    process: { cwd: () => "/fixture", env: {} },
    require: (name) => {
      if (name === "../content/current-event.json") return { slug };
      if (name === "node:fs") return { readFileSync: (file) => {
        assert.equal(file, path.join("/fixture", "content/events", `${slug}.json`));
        return JSON.stringify(data);
      } };
      return require(name);
    },
  });
  return exports;
}

test("current poster includes both days and every schedule entry", () => {
  const result = loadEvent(current);
  assert.equal(result.eventDays.length, 2);
  assert.equal(result.eventDays.flatMap((day) => day.items).length, current.schedule.length);
  assert.equal(result.eventDays[1].items[0].title, "향후 모임 발전 방향 및 공동 연구 논의");
});

test("next one-day event uses its own data without duplicate days", () => {
  const next = { ...current, slug: "2027-spring", title: "다음 행사", startDate: "2027-03-05", endDate: "2027-03-05", schedule: [{ ...current.schedule[0], date: "2027-03-05" }] };
  const result = loadEvent(next);
  assert.equal(result.event.title, "다음 행사");
  assert.equal(result.eventDays.length, 1);
  assert.equal(result.eventDateRange, "2027. 03. 05 (금)");
});

test("three-day event across years keeps all days and complete dates", () => {
  const dates = ["2026-12-31", "2027-01-01", "2027-01-02"];
  const result = loadEvent({ ...current, slug: "new-year", startDate: dates[0], endDate: dates[2], schedule: dates.map((date) => ({ ...current.schedule[0], date })) });
  assert.equal(result.eventDays.length, 3);
  assert.equal(result.eventDateRange, "2026. 12. 31 (목) – 2027. 01. 02 (토)");
});

test("invalid event selection fails instead of reading outside event directory", () => {
  assert.throws(() => loadEvent(current, "../other"), /Invalid current event slug/);
});
