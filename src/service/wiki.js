import { $ as $http, axios } from "./axios";

const { __helperUrl } = require("@jx3box/jx3box-common/data/jx3box.json");
const qs = require("qs");

// 百科相关统计
function get_count() {
    return $http.get(`${__helperUrl}api/wiki/count`, {
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { get_count };
