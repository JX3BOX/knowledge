import { axios,$ } from "./axios";
import { __bb } from "@jx3box/jx3box-common/js/jx3box.json";

function getPost(pid) {
    return axios.get(__bb + `api/wiki/${pid}`);
}

function getPosts(params) {
    return axios.get(__bb + "api/wiki/search/", {
        params: params,
    });
}

function adminPost(pid,status) {
    return $.post(__bb + `admin/wiki/${pid}/check`, {
        status: status,
    });
}

export { getPosts, getPost, adminPost };
