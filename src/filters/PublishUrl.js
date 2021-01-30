/**
 * 发布页链接
 * @param {*} string 发布路径
 */

const {JX3BOX} = require("@jx3box/jx3box-common");
export default (val) => {
    return JX3BOX.__Links.dashboard.publish + "#/" + val;
}

