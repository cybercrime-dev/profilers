import { profile } from "./profiler.js";
import { profile_intensive } from "./profiler-intensive.js";

function flatten_json(obj, flat, path) {
    for (let key in obj) {
        if (typeof obj[key] !== "object") {
            flat[path + key] = obj[key];
        } else {
            flatten_json(obj[key], flat, path + key + ".");
        }
    }
    return flat;
}

function display_json_in_table(obj, table) {
    let flat = flatten_json(obj, {}, "");

    console.log(flat);

    table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;

    for (let key in flat) {
        let row = table.insertRow(-1);

        let key_cell = row.insertCell(-1);
        let value_cell = row.insertCell(-1);

        key_cell.innerHTML = key;
        value_cell.innerHTML = flat[key];
    }
}

export function do_profile() {
    let table = document.getElementById("profile-details");

    if (!table) {
        console.log("no table found")
        return;
    }

    let results = profile();

    if (!results) {
        console.log("unable to profile this browser");
        return;
    }

    display_json_in_table(results, table);
}

export function do_invasive_profile() {
    let table = document.getElementById("profile-details-invasive");

    if (!table) {
        return;
    }

    let results = profile_intensive();

    if (!results) {
        console.log("unable to profile this browser");
        return;
    }

    display_json_in_table(results, table);
}

do_profile();

window.do_invasive_profile = do_invasive_profile;
window.do_profile = do_profile;
