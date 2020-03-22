import _ from "lodash-es";
import http from "./http";

function getUrl(collection) {
  return `/${collection}`;
}

export const find = async (collection, options) => {
  const url = `${getUrl(collection)}`;
  let r = await http.get(url, options);
  return r.data;
};

export const get = async (collection, id) => {
  const url = `${getUrl(collection)}/${id}`;
  let r = await http.get(url);
  return r.data;
};

export const findOne = async (collection, options) => {
  let r = await find(collection, _.merge({ params: { _limit: 1 } }, options));
  return r[0];
};

export const count = async collection => {
  const url = `${getUrl(collection)}/count`;
  let r = await http.get(url);
  return r.data;
};

export const create = async (collection, data) => {
  const url = `${getUrl(collection)}`;
  let r = await http.post(url, data);
  return r.data;
};

export const update = async (collection, id, data) => {
  const url = `${getUrl(collection)}/${id}`;
  let r = await http.put(url, data);
  return r.data;
};

export const remove = async (collection, id) => {
  const url = `${getUrl(collection)}/${id}`;
  let r = await http.delete(url);
  return r.data;
};
