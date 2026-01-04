// src/core/system/achievements.js
import { on, emit } from "../events/bus.js";
import { EVENTS } from "../events/types.js";
import { t } from "../i18n/i18n.js";

const ACHIEVEMENT_DEFS = [
  {
    id: "cli_user",
    titleKey: "achievements.cli_user.title",
    descKey: "achievements.cli_user.desc",
    xp: 50,
  },
  {
    id: "avatar_switch",
    titleKey: "achievements.avatar_switch.title",
    descKey: "achievements.avatar_switch.desc",
    xp: 100,
  },
  {
    id: "easter_egg_1",
    titleKey: "achievements.easter_egg_1.title",
    descKey: "achievements.easter_egg_1.desc",
    xp: 200,
  },
  {
    id: "spam",
    titleKey: "achievements.spam.title",
    descKey: "achievements.spam.desc",
    xp: 10,
  },
  {
    id: "sudo",
    titleKey: "achievements.sudo.title",
    descKey: "achievements.sudo.desc",
    xp: 500,
  },
  {
    id: "coffee_break",
    titleKey: "achievements.coffee_break.title",
    descKey: "achievements.coffee_break.desc",
    xp: 25,
  },
  {
    id: "theme_switcher",
    titleKey: "achievements.theme_switcher.title",
    descKey: "achievements.theme_switcher.desc",
    xp: 75,
  },
  {
    id: "vault_unlocked",
    titleKey: "achievements.vault_unlocked.title",
    descKey: "achievements.vault_unlocked.desc",
    xp: 150,
  },
];

let unlocked = JSON.parse(localStorage.getItem("jojo-achievements")) || [];

const resolveAchievement = (id) => {
  const def = ACHIEVEMENT_DEFS.find((a) => a.id === id);
  if (!def) return null;
  return {
    ...def,
    title: t(def.titleKey) || def.id,
    desc: t(def.descKey) || "",
  };
};

export function initAchievements() {
  const unlock = (id) => {
    if (unlocked.includes(id)) return;

    const achievement = resolveAchievement(id);
    if (achievement) {
      unlocked.push(id);
      localStorage.setItem("jojo-achievements", JSON.stringify(unlocked));

      emit("sys:achievement", achievement);

      const audio = new Audio("assets/sounds/success_chime.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  // --- ESCUCHAS (LISTENERS) ---

  on(EVENTS.CLI_INPUT, (cmd) => {
    unlock("cli_user");
    if (cmd === "clear" || cmd === "cls") unlock("spam");
    if (cmd.includes("sudo")) unlock("sudo");
    if (cmd.includes("coffee")) unlock("coffee_break");
  });

  on(EVENTS.UI_THEME_CHANGED, (theme) => {
    unlock("theme_switcher");
    if (theme === "matrix") unlock("easter_egg_1");
  });

  on(EVENTS.AVATAR_TOGGLE, () => {
    unlock("avatar_switch");
  });

  on(EVENTS.ACHIEVEMENTS_VIEWED, () => {
    unlock("vault_unlocked");
  });

  // Konami Code (solo mensaje divertido)
  const konami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let kPos = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key === konami[kPos]) {
      kPos++;
      if (kPos === konami.length) {
        emit(EVENTS.CLI_OUTPUT, {
          type: "text",
          value: "ALL CHEATS ENABLED... JUST KIDDING.",
        });
        kPos = 0;
      }
    } else {
      kPos = 0;
    }
  });

  console.log(
    `[Achievements] Loaded: ${unlocked.length}/${ACHIEVEMENT_DEFS.length}`
  );
}

// Para mostrar el progreso en el Dashboard
export function getAchievementStats() {
  return {
    unlocked: unlocked.length,
    total: ACHIEVEMENT_DEFS.length,
  };
}

export function getUnlockedAchievements() {
  return unlocked.map((id) => resolveAchievement(id)).filter(Boolean);
}

export function listAchievementsPrintable() {
  const stats = getAchievementStats();
  const list = getUnlockedAchievements();
  const locked = stats.total - stats.unlocked;

  const lines = [
    `${t("achievements.shell.title")} ${stats.unlocked}/${stats.total}`,
    ...list.map((a) => `- ${a.title} (${a.xp} XP): ${a.desc}`),
    locked > 0
      ? (t("achievements.shell.locked") || "").replace("{count}", locked)
      : t("achievements.shell.complete"),
  ];

  return lines.join("\n");
}
