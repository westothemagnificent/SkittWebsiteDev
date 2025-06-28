// vars

// export const URL_ROOT = "https://skitt.onrender.com";
export const URL_ROOT = "http://localhost:3000";

// functions

export function changeStyleOfElements(styleProp, value, ...elements) {
    // loop and chnage stype
    for (const element of elements) {
        element.style[styleProp] = value;
    }
}

export function get(query) {
    return document.querySelector(query);
}