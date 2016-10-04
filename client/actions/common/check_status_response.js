// export default function checkStatus(response) {
//     if (response.ok){
//         return response;
//     } else {
//         let error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//     }
// }

export const checkStatus = response => {
    if (response.ok)
        return response;

    let error = new Error(response.statusText);
    error.response = response;
    console.log('ОШИБКА',error);
    throw error;

};
export const checkStatus2 = response => {
    if (response.ok)
        return response;

    let error = new Error(response.statusText);
    error.response = response;
    Promise.resolve().then(() => response.json()).then(res => {

        error.body = res;
        // console.log('errr',error.body, error);
        throw error;
    });

};
