import { axios, $ } from "./axios";
import { __bb, __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getPost(pid) {
    return axios.get(__bb + `api/wiki/${pid}`);
}

function getList(params) {
    return $.get(__bb + "admin/wiki/user_item/", {
        params: params,
    });
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

function doAction(id, action, desc) {
    return $.post(__bb + `admin/wiki/user_item/${id}/approval`, "", {
        params: {
            status: action,
            description: desc,
        },
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

export {
    getPosts,
    getPost,
    adminPost,
    getUserPost,
    getAuthors,
    getRankPost,
    getList,
    doAction,
};
