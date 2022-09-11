function extract_user_agent_software(ua) {
    let software = ua.match(/(Chrome|Firefox|Opera|Edge|MSIE|Safari)\/(\d|\.)+/g) || ["unspecified"];

    return software[0];
}

function extract_user_agent_hardware_type(ua) {
    let hardware = ua.match(/(x86_64|x86|M1|M2|SV1|SV2|aarch64|armv7l|arm)/g) || ["unspecified"];

    return hardware[0];
}

function extract_user_agent_os(ua) {
    let os = ua.match(/(Linux|Windows|Mac OS X|CrOS|iOS)/g) || ["unspecified"];

    return os[0];
}

function extract_user_agent_platform(ua) {
    let platform = ua.match(/(Android|iPhone|iPad|Huawei|iOS)/g) || ["unspecified"];

    return platform[0];
}

function extract_user_agent_layout_engine(ua) {
    let layout_engine = ua.match(/(Blink|WebKit|Gecko|Trident|EdgeHTML|NetFront|KHTML)/g) || ["unspecified"];

    return layout_engine[0];
}

function extract_preferences() {
    return {
        "languages": navigator.languages,
        "do_not_track": navigator.doNotTrack,
        "cookies_enabled": navigator.cookieEnabled ? "enabled" : "disabled"
    };
}

function extract_display_info() {
    return {
        "height": window.screen.height,
        "width": window.screen.width,
        "color_depth": window.screen.colorDepth,
        "orientation": window.screen.orientation.type
    };
}

function extract_user_agent() {
    let ua = navigator.userAgent;

    return {
        "full": ua,
        "software": extract_user_agent_software(ua),
        "hardware_type": extract_user_agent_hardware_type(ua),
        "os": extract_user_agent_os(ua),
        "platform": extract_user_agent_platform(ua),
        "layout_engine": extract_user_agent_layout_engine(ua)
    };
}

export function profile() {
    return {
        "user_agent": extract_user_agent(),
        "display": extract_display_info(),
        "preferences": extract_preferences()
    };
}
