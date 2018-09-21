window.k_report = {
    dom_complete: null,
    window_onload: null
}

document.addEventListener( 'DOMContentLoaded', function(){
    window.k_report.dom_complete = new Date().getTime();
})

window.onload = function(){
    window.k_report.window_onload = new Date().getTime();
}