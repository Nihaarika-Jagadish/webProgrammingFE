import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
export function isLocalhost() {
    return (window.location.host.includes("127.0.0.1") || window.location.host.includes("localhost"));
}

export function configurationVariables(category){
    if(isLocalhost()){
        switch(category){
            case "url":
                return 'https://d-lipnetapi.mapcom.local/api/v2'
            case "cookieDomain":
                return 'localhost'
            case 'returnTo':
                return 'https://d-lipnetportal.mapcom.local/'
            default:
                break
        }
    }
    else{
        switch(category){
            case "url":
                return 'https://d-lipnetapi.mapcom.local/api/v2'
            case "cookieDomain":
                return '.mapcom.local'
            case 'returnTo':
                return 'https://d-lipnetportal.mapcom.local/'
            default:
                break
        }
    }
}

export function call(url, parameters, successHandler, errorHandler, requestType) {
    const cookies = new Cookies();
    const cookieDomain = configurationVariables('cookieDomain')
    const token = cookies.get("token");
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
                    if(cookies.get('user') == 'true'){
                        cookies.remove('token', { domain: cookieDomain })
                        cookies.remove('user', { domain: cookieDomain })

                        window.location.href = configurationVariables('returnTo')
                    }
                } else {
                    Swal.fire(JSON.parse(content)["Message"], '', 'error').then((result) => {
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

