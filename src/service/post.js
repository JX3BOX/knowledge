import { axios, $ } from "./axios";
import { __bb, __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getPost(pid) {
    return axios.get(__bb + `api/wiki/${pid}`);
}

function getPosts(params) {
    return axios.get(__bb + "api/wiki/search/", {
        params: params,
    });
}

function getUserPost(hid) {
    return axios.get(__bb + "api/wiki/user_item/" + hid);
}

function getUserPosts(params) {
    return $.get(__bb + "admin/wiki/user_item/", {
        params: params,
    });
}

function getHistory(id) {
    return axios.get(__bb + "api/wiki/" + id + "/history");
}

function adminPost(pid, status) {
    return $.post(__bb + `admin/wiki/${pid}/check`, {
        status: status,
    });
}

function checkPost(id, action, desc) {
    return $.post(__bb + `admin/wiki/user_item/${id}/approval`, "", {
        params: {
            status: action,
            description: desc,
        },
    });
}

function getRankPosts(list) {
    return axios.get(__bb + "api/wiki/search/", {
        params: {
            list: list,
        },
    });
}

function getPendingCount() {
    return $.get(__bb + "admin/wiki/user_item/pending_cnt");
}

function getAuthors(uids) {
    return axios.get(__server + "user/list", {
        params: {
            uid: uids,
        },
    });
}

export {
    getPosts,
    getPost,
    adminPost,
    getUserPost,
    getAuthors,
    getRankPosts,
    getUserPosts,
    checkPost,
    getPendingCount,
    getHistory,
};
