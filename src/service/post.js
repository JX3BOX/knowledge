import { axios } from "./axios";
import { __bb } from "@jx3box/jx3box-common/js/jx3box.json";

// function getPosts(params, vm) {
//     let query = {
//         type: "fb",
//     };
//     if (params) {
//         query = Object.assign(query, params);
//     }

//     return $.get(API_LIST, {
//         params: query,
//     })
// }
// function getPost(pid, vm) {
//     return $.get(API_SINGLE, {
//         params: {
//             id: pid,
//         },
//     })
// }

function searchPost(kw){
    return axios.get(__bb + 'api/wiki/search/' + kw)
}

export { searchPost };
