function sigmoid(x) {
    return 1.0 / (1.0 + Math.exp(-x));
}
function sign(x) {
    return x < 0 ? -1 : 1;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function lerp_clamped(a, b, t) {
    return lerp(a, b, clamp(t, 0, 1));
}
function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
function generate_logo_curve_path(time) {
    time = clamp(time, 0, 1);
    var x1 = Math.cos(time * Math.PI / 2) * 4.5;
    var y1 = -Math.sin(time * Math.PI / 2) * 4.5 + 5;
    var x2 = Math.cos(time * Math.PI / 2) * 4.5;
    var y2 = Math.sin(time * Math.PI / 2) * 4.5 + 5;
    return "M ".concat(x1, " ").concat(y1, " A 4.5 4.5 0 0 1 ").concat(x2, " ").concat(y2);
}
function rgb_to_hex(r, g, b) {
    var r_str = clamp(Math.floor(r), 0, 255).toString(16);
    var g_str = clamp(Math.floor(g), 0, 255).toString(16);
    var b_str = clamp(Math.floor(b), 0, 255).toString(16);
    return "#".concat(r_str.padStart(2, "0")).concat(g_str.padStart(2, "0")).concat(b_str.padStart(2, "0"));
}

var start_time;
function render(timestamp) {
    // time management
    if (start_time == undefined) {
        start_time = timestamp;
    }
    var time = timestamp - start_time;
    var seconds = time / 1000 + 0.5;
    var logo_k_time = seconds < 1 ? -1 / ((seconds - 1) * 20 - 1) : 1;
    var logo_other_time = seconds > 1 ? (1 - 1 / ((seconds - 1) * 20 + 1)) : 0;
    var logo_curve = document.getElementById("logo-curve");
    logo_curve.setAttribute("d", generate_logo_curve_path(logo_other_time));
    var logo_k_upright = document.getElementById("logo-k-upright");
    logo_k_upright.setAttribute("x2", lerp_clamped(11, 5, logo_k_time).toString());
    logo_k_upright.setAttribute("y2", lerp_clamped(-1, 5, logo_k_time).toString());
    var logo_k_downright = document.getElementById("logo-k-downright");
    logo_k_downright.setAttribute("x2", lerp_clamped(11, 5, logo_k_time).toString());
    logo_k_downright.setAttribute("y2", lerp_clamped(11, 5, logo_k_time).toString());
    var logo_centerline = document.getElementById("logo-centerline");
    logo_centerline.setAttribute("y1", lerp_clamped(5, 0, logo_other_time).toString());
    logo_centerline.setAttribute("y2", lerp_clamped(5, 10, logo_other_time).toString());
    var logo_left_line = document.getElementById("logo-left-line");
    logo_left_line.setAttribute("x1", lerp_clamped(5, 0, logo_other_time).toString());
    var logo_baseline = document.getElementById("logo-baseline");
    logo_baseline.setAttribute("x1", lerp_clamped(9.5, 0, logo_other_time).toString());
    var logo_svg = document.getElementById("logo");
    var logo_elements = [
        logo_curve,
        logo_k_upright,
        logo_k_downright,
        logo_centerline,
        logo_left_line,
        logo_baseline,
    ];
    var magnitude_norm = sigmoid((seconds - 2) * 10);
    // var magnitude = magnitude_norm * 35;
    // var spin = (sigmoid((seconds - 2) * 4) - 1 + Math.PI) * 25;
    logo_elements.forEach(function (element) {
        element.setAttribute("stroke", rgb_to_hex(lerp(0xff, 0xff, magnitude_norm), lerp(0x88, 0xff, magnitude_norm), lerp(0xcc, 0xff, magnitude_norm)));
    });
    // let rect = $("#logo-slot")[0].getBoundingClientRect();
    // let center_x = (rect.left + rect.width / 2);
    // let center_y = (rect.top + rect.height / 2);
    // logo_svg.style.translate = `${center_x * magnitude_norm}px ${center_y * magnitude_norm}px`;
    // logo_svg.style.left = `calc(${(1 - magnitude_norm) * 50}% + ${center_x * magnitude_norm}px)`;
    // logo_svg.style.top = `calc(${(1 - magnitude_norm) * 50}% + ${center_y * magnitude_norm}px)`;
    // logo_svg.style.height = `calc(${80 - magnitude_norm * 80}vh + ${magnitude_norm * 100}px)`;
    // $("#intro-blocker")[0].style.opacity = `${1 - magnitude_norm}`;

    window.requestAnimationFrame(render);
}
function logoanim() {
    window.requestAnimationFrame(render);
}
