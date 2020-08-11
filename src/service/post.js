import { axios, $ } from "./axios";
import { __bb, __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getPost(pid) {
    return axios.get(__bb + `api/wiki/${pid}`);
}

function getUserPost(hid) {
    return $.get(__bb + "admin/wiki/user_item/" + hid);
}
function getPosts(params) {
    return axios.get(__bb + "api/wiki/search/", {
        params: params,
    });
}

function adminPost(pid, status) {
    return $.post(__bb + `admin/wiki/${pid}/check`, {
        status: status,
    });
}

function getAuthors(uids) {
    return axios.get(__server + "user/list", {
        params: {
            uid: uids,
        },
    });
}

function getRankPost(list) {
    return axios.get(__bb + "api/wiki/search/", {
        params: {
            list: list,
        },
    });
}

export { getPosts, getPost, adminPost, getUserPost, getAuthors, getRankPost };
