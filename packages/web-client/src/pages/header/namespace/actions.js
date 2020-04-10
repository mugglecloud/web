import { json } from "overmind";

export const setActive = ({ state }, active) => {
  state.header.active = active;
};

export const toggleMenu = ({ state }) => {
  state.header.menuCollapsed = !state.header.menuCollapsed;
};

export const next = ({ state }, direction) => {
  const active = state.header.active + direction;
  if (active < 0 || active > state.header.navs.length) return;

  state.header.isNavigating = true;

  state.header.active = active;
};

export const init = ({ state }, header) => {
  Object.assign(state.header, json(header));
};

export const setValue = ({ state }, v) => {
  const current = state.header.current;
  if (current) current.value = v;
};

export const clearNavigating = ({ state }) => {
  state.header.isNavigating = false;
  console.log("clear nav");
};
