const fs = require("fs");
const PouchDB = (() => { const tmpPouch = require("pouchDB");  return (tmpPouch.plugin ? tmpPouch : tmpPouch.default)})();

const OBJ_TYPE = {
    DEVICES: "devices",
    ROOMS: "rooms",
    FLOORS: "floors",
    GROUPS: "groups",
    NVRS: "NVRs",
    RULES: "rules",
    OTA: "ota",
    IR_REMOTES: "remotes",
    HOME_ENVIRONMENTS: "home_environments",
    MUSICS: "music_list",
    CAMERAS: "cameras",
    DEV_WAKEUP: "devices_wakeup",
    REROUNTING: "rerouting",
    DEV_OFF: "devices_off",
    USERS: "users",
    NET: "net",
    JOIN: "join",
    LEFT: "left",
    LEARN_MODE: "learn_mode",
    ADVANCED: "advanced",
    BRIGDES: "brigdes",
    RESET_BRIDGE: "reset_brigde",
    RESET_FACTORY: "reset_factory",
    BACKUP_DATA: "backup",
    RESTORE_DATA: "restore",
    REPLACE_HC: "replace",
    DEBUG_ENABLE: "debug",
    DEV_JOIN: "devices_join",
    DEV_LEFT: "devices_left",
    DEVICES_LOCAL: "devices_local",
    HCS: "hcs",
    VERSIONS: "versions",
    SERVERVERSION: "serverversion",
    MSG: "msg",
    NOTIFY: "notify",
    SYSTEM_INFO: "system_info",
    REBOOT: "reboot",
    CHANGE_NETWORK: "change_network",
    HC_CONNECT: "hcs_connect",
    HC_IP_VPN: "hc_ip_vpn",
    ENERGY_LOAD_STATISTIC: "energy_data"
};

PouchDB.plugin(require("pouchdb-adapter-leveldb"));
PouchDB.plugin(require("pouchdb-find"));

const DB = new PouchDB("edgeDatabase", { adapter: "leveldb" });

const data = {};

Promise.allSettled(Object.values(OBJ_TYPE).map(curVal => {
    return DB.get(curVal, (err, content) => {
        if (!err) {
            data[curVal] = content;
        }
    });
})).then(_ => {
    DB.close();
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    console.log(`Wrote data.json with ${Object.keys(data).length} entries.`)
});
