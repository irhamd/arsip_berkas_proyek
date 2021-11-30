const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
};

export function cekRefresh() {
    window.addEventListener("beforeunload", alertUser);
    return () => {
        window.removeEventListener("beforeunload", alertUser);
    };
}