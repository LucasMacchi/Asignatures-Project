
export function getJWT (){
    return localStorage.getItem('jwtToken');
}

export function deleteJWT () {
    localStorage.removeItem('jwtToken')
}