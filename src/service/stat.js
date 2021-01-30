import { $next } from "@jx3box/jx3box-common/js/axios";

function getStat(id) {
    return $next
        .get("api/summary-any/" + "knowledge-" + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function postStat(id) {
    return $next.get("api/summary-any/" + "knowledge-" + id, {
        params: {
            type: "knowledge",
            actions: "views",
        },
    });
}
function getRank() {
    return $next.get("api/summary/visit/rank", {
        params: {
            postType: "knowledge",
            postAction: "views",
            pageSize: 20,
        },
    });
}

export { getStat, postStat, getRank };
