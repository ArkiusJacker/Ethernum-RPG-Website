/**
 * ETHERNUM v3.9 - Index application shell
 * Keeps the public index static for GitHub Pages while moving behavior into an
 * app-style controller.
 */

(function () {
  const INDEX_INTRO_KEY = "ethernum-index-intro-seen";
  const INDEX_INTRO_MODE_KEY = "ethernum-index-intro-mode";
  const INDEX_AUDIO_KEY = "ethernum-music-url-index";
  const CUSTOM_AUDIO_KEY = "ethernum-enable-custom";

  class EthernumIndexApp {
    constructor(root = document) {
      this.root = root;
      this.intro = root.querySelector(".intro-gate");
      this.modeButton = root.querySelector("[data-intro-mode]");
      this.audio = null;
    }

    init() {
      this.setupIntroGate();
      this.renderCampaignDashboard();
      this.setupIndexAudio();
      this.setupNavigationState();
      window.EthernumIndexApp = this;
    }

    setupIntroGate() {
      this.updateIntroModeLabel();

      this.modeButton?.addEventListener("click", () => {
        const always = localStorage.getItem(INDEX_INTRO_MODE_KEY) === "always";
        localStorage.setItem(INDEX_INTRO_MODE_KEY, always ? "once" : "always");
        this.updateIntroModeLabel();
      });

      const shouldShowIntro =
        localStorage.getItem(INDEX_INTRO_MODE_KEY) === "always" ||
        localStorage.getItem(INDEX_INTRO_KEY) !== "true";

      if (!this.intro || !shouldShowIntro) return;

      document.body.classList.add("has-intro");
      this.intro.classList.add("is-visible");

      this.intro
        .querySelector("[data-intro-always]")
        ?.addEventListener("click", (event) => {
          localStorage.setItem(INDEX_INTRO_MODE_KEY, "always");
          this.updateIntroModeLabel();
          event.currentTarget.textContent = "Abertura marcada como sempre ativa";
        });

      this.intro
        .querySelector("[data-enter-site]")
        ?.addEventListener("click", () => this.closeIntroGate());
    }

    updateIntroModeLabel() {
      if (!this.modeButton) return;
      const always = localStorage.getItem(INDEX_INTRO_MODE_KEY) === "always";
      this.modeButton.textContent = always ? "Intro: sempre" : "Intro: uma vez";
    }

    closeIntroGate() {
      if (localStorage.getItem(INDEX_INTRO_MODE_KEY) !== "always") {
        localStorage.setItem(INDEX_INTRO_KEY, "true");
      }
      this.intro?.classList.remove("is-visible");
      document.body.classList.remove("has-intro");
    }

    setupIndexAudio() {
      if (localStorage.getItem(CUSTOM_AUDIO_KEY) === "false") return;

      const src = localStorage.getItem(INDEX_AUDIO_KEY);
      if (!src) return;

      this.audio = new Audio(src.replace(/^\.\.\/\.\.\//, ""));
      this.audio.loop = true;
      this.audio.volume = 0.05;

      document.addEventListener(
        "click",
        () => this.audio?.play().catch(() => null),
        { once: true },
      );
    }

    renderCampaignDashboard() {
      const data = window.ETHERNUM_WORLD;
      if (!data) return;
      this.renderSummary(data);
      this.renderCampaignPanel(data);
    }

    renderSummary(data) {
      const host = this.root.querySelector("[data-dashboard-summary]");
      if (!host) return;
      const mission =
        typeof data.activeMission === "string"
          ? { name: data.activeMission }
          : data.activeMission || {};
      const entries = [
        { value: String(data.operators?.length || 0), label: "operadores no roster" },
        { value: data.currentSession || "A definir", label: "sessao atual" },
        { value: data.currentLocation || "A definir", label: "local atual" },
        { value: mission.name || "Aguardando contrato", label: "missao ativa" },
        { value: data.teamRank || "Rank a definir", label: "rank da equipe" },
        { value: data.ep || mission.ep || "A definir", label: "EP atual" },
      ];
      host.innerHTML = entries
        .map(
          (item) => `
            <div class="signal">
              <strong>${this.escape(item.value)}</strong>
              <span>${this.escape(item.label)}</span>
            </div>`,
        )
        .join("");
    }

    renderCampaignPanel(data) {
      const host = this.root.querySelector("[data-campaign-dashboard]");
      if (!host) return;
      const mission =
        typeof data.activeMission === "string"
          ? { name: data.activeMission }
          : data.activeMission || {};
      host.innerHTML = `
        <article class="ops-card dashboard-card dashboard-card-main">
          <span class="tag">Contrato ativo</span>
          <h3>${this.escape(mission.code || "CONTRATO")}</h3>
          <div class="ops-list">
            ${this.infoRow("Missao", mission.name || "Aguardando contrato")}
            ${this.infoRow("Rank", mission.rank || data.teamRank)}
            ${this.infoRow("EP", mission.ep || data.ep)}
            ${this.infoRow("Risco", mission.risk || data.corporateRisk)}
            ${this.infoRow("Status", mission.status || data.campaignStatus)}
            ${this.infoRow("Objetivo", mission.objective || data.nextObjective)}
          </div>
        </article>
        <article class="ops-card dashboard-card">
          <span class="tag">Operadores</span>
          <h3>Equipe ativa</h3>
          <div class="operator-list">
            ${(data.operators || [])
              .map(
                (operator) => `
                  <div class="operator-item">
                    <strong>${this.escape(operator.name)}</strong>
                    <span>${this.escape(operator.status)} · ${this.escape(operator.role)}</span>
                  </div>`,
              )
              .join("")}
          </div>
        </article>
        <article class="ops-card dashboard-card">
          <span class="tag">Transmissao</span>
          <h3>Companhia</h3>
          <p>${this.escape(data.transmission || "Transmissao pendente.")}</p>
          <div class="ops-list">
            ${this.infoRow("Data", data.currentWorldDate)}
            ${this.infoRow("Proximo", data.nextObjective)}
          </div>
        </article>
        <article class="ops-card dashboard-card dashboard-card-wide">
          <span class="tag">Alertas</span>
          <h3>Fila operacional</h3>
          <div class="alert-list">
            ${(data.alerts || [])
              .map((alert) => `<span>${this.escape(alert)}</span>`)
              .join("")}
          </div>
        </article>`;
    }

    infoRow(label, value) {
      return `
        <div class="ops-item">
          <strong>${this.escape(label)}</strong>
          <span>${this.escape(value || "A definir")}</span>
        </div>`;
    }

    escape(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    setupNavigationState() {
      const links = this.root.querySelectorAll(".nav a[href], .actions a[href]");
      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("#")) return;
        link.addEventListener("click", () => {
          links.forEach((item) => item.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "page");
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new EthernumIndexApp().init();
  });
})();
