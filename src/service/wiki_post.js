import {$ as $http} from "./axios";

const {__helperUrl} = require("@jx3box/jx3box-common/js/jx3box.json");
const qs = require("qs");

// 获取最新攻略
function get_newest_post(type, id) {
  if (!id) return;
  return $http.get(`${__helperUrl}api/wiki/post`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {type: type, source_id: id},
  });
}

// 获取最新攻略列表
function get_newest_posts(type) {
  return $http.get(`${__helperUrl}api/wiki/posts/newest`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {type: type},
  });
}

// 获取指定攻略
function get_post(post_id) {
  if (!post_id) return null;
  return $http.get(`${__helperUrl}api/wiki/post/${post_id}`, {
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

// 获取历史版本
function get_versions(type, id) {
  if (!id) return;
  return $http.get(`${__helperUrl}api/wiki/post/versions`,{
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {type: type, source_id: id},
  });
}

export {
  get_newest_post,
  get_newest_posts,
  get_post,
  get_versions,
};