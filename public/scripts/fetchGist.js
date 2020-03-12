let hash = window.location.pathname.split('/').pop();
if (hash) {
    fetch('https://api.github.com/gists/' + hash,
    {
        headers: { accept: 'application/vnd.github.VERSION.base64' }
    })
    .then(response => { 
        if(response.status != 200) return null;
        return response.json() })
    .then(response => { 
        if(response){
            window.response = response; 
            document.dispatchEvent(new CustomEvent("Gist fetched"));
        } else window.location.href = "https://www.noesisengine.com/xamltoy/";
    })
    .catch((err) => {
        console.log(err);
    })
}