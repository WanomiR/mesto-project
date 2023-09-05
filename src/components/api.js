// ---------- Variables ---------- //

const apiConfig = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
    headers: {
        authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
        "Content-Type": "application/json"
    }
}


// ---------- Exports ----------- //

export {apiConfig}

// // test request to the server
// const makeRequest = (dir, headersParams = null, ...otherParams) => {
//     return fetch(`https://mesto.nomoreparties.co/v1/plus-cohort-28/${dir}`, {
//         headers: {
//             authorization: "ae8892c5-a1e1-40d3-aba9-31eb2dd98185",
//             ...headersParams
//         },
//         ...otherParams
//     });
// }
//
//
// makeRequest("cards", null, {method: "GET"})
//     .then(res => res.json())
//     .then(res => console.log(res));
//
// // console.log(param)
// // console.log(JSON.parse(param))
//
//
