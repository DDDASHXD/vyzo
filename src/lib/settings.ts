export interface iSettings {
  layout: {
    horizontalSize: number;
  };
}

const defaultSettings = () => {
  const defaultSettings = {
    layout: {
      horizontalSize: 30,
    },
    persistence: {
      file: null,
      folder: null,
      recentFiles: [],
    },
  };

  localStorage.setItem("vyzosettings", JSON.stringify(defaultSettings));
};

export const getSettings = () => {
  let settings = localStorage.getItem("vyzosettings");

  if (!settings) {
    defaultSettings();
    return;
  }

  let settingsParsed = settings ? JSON.parse(settings) : null;

  return settingsParsed;
};

export const setSettings = (settings: iSettings) => {
  let stringified = JSON.stringify(settings);
  localStorage.setItem("vyzosettings", stringified);
};
