import { WebContainer } from "@webcontainer/api";

// Call only once
let webContainerInstance = null;

export const getWebContainer = () => {
  if (webContainerInstance === null) {
    webContainerInstance = new WebContainer();
  }
  return webContainerInstance;
};
