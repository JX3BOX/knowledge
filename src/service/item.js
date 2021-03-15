import { $ as $http, axios } from "./axios";

const { __helperUrl } = require("@jx3box/jx3box-common/data/jx3box.json");
const qs = require("qs");

// 获取物品统计信息
function get_count() {
    return $http.get(`${__helperUrl}api/items/count`, {
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { get_count };
