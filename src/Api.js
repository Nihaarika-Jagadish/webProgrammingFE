import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
export function isLocalhost() {
    return (window.location.host.includes("127.0.0.1") || window.location.host.includes("localhost"));
}

export function configurationVariables(category){
    if(isLocalhost()){
        switch(category){
            case "url":
                return 'http://localhost:3013'
            case "cookieDomain":
                return 'localhost'
            case 'returnTo':
                return 'http://localhost:3013'
            default:
                break
        }
    }
    else{
        switch(category){
            case "url":
                return 'http://localhost:3013'
            case "cookieDomain":
                return 'localhost'
            case 'returnTo':
                return 'http://localhost:3013'
            default:
                break
        }
    }
}

export function call(url, parameters, successHandler, errorHandler, requestType) {
    const cookieDomain = configurationVariables('cookieDomain')
    const token = localStorage.getItem("token");
    if (!parameters.headers) {
        parameters.headers = {};
    }

    if (!parameters.headers['Authorization']) {
        parameters.headers['Authorization'] = 'Bearer ' + token;
    }

    if (!parameters.headers['Content-Type'] && parameters.body && !requestType) {
        parameters.headers['Content-Type'] = 'application/json';
        parameters.body = JSON.stringify(parameters.body);
    }

    if(!url.includes("qav2")){
     url = configurationVariables('url') + url
    }
        fetch(url, parameters)
        .then(function(response) {
            getContent(response).then((content) => {
                if (response.ok) {
                    if (typeof(successHandler) === 'function') {
                        successHandler(content, response.status);
                    }
                } else if (response.status === 401) {
                    // 
                    if(localStorage.get('tokenPresent') == true){
                        localStorage.removeItem('token')
                        localStorage.removeItem('tokenPresent')
                        window.location.href = configurationVariables('returnTo')
                    }
                } else {
                    Swal.fire(JSON.parse(content)["message"], '', 'error').then((result) => {
                    })
                    errorHandler(response.statusText, content, response.status)
                }
            })
        });


}



function getContent(response) {
    let contentType = response.headers.get("Content-Type");
    if (contentType === 'application/json') {
        return (response.json());
    }
    return response.text();
}

