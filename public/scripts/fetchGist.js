let hash = window.location.pathname.split('/').pop();
if (hash) {
    fetch('https://api.github.com/gists/' + hash,
    {
        headers: { accept: 'application/vnd.github.VERSION.base64' }
    })
    .then(response => { return response.json() })
    .then(response => { 
        if(response.message != "Not Found"){
            window.response = response; 
            document.dispatchEvent(new CustomEvent("Gist fetched"));
        }else{
            window.location.href = "/";
        }
    })
    .catch((err) => {
        console.log(err);
    })
}