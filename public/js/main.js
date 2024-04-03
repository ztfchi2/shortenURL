const urlForm = document.getElementById("url_form")
const shortenBtn = document.getElementById("shorten_btn")
const messageContainer = document.getElementById("message-container")
const messageText = document.getElementById("message-text")

function displayErrorMessage(message) {
    messageContainer.classList.remove("none-message")
    messageContainer.classList.remove("action-message")
    messageContainer.classList.add("error-message")
    messageText.innerText = message
}

function displayActionMessage(message) {
    messageContainer.classList.remove("none-message")
    messageContainer.classList.remove("error-message")
    messageContainer.classList.add("action-message")
    messageText.innerText = message
}

function hiddenMessage() {
    messageContainer.classList.add("none-message")
    messageText.innerText = ''
}



function changeBtnToCopy() {
    shortenBtn.value = "copy"
    shortenBtn.innerText = "COPY"
}

function changeBtnToShorten() {
    shortenBtn.value = "shorten"
    shortenBtn.innerText = "SHORTEN"
}

const isUrl = (urlString)=> {
    var urlPattern = new RegExp('^(https?:\\/?\\/?)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}


async function requestShortURL(url){
    const response = await fetch("/url/short?url="+url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })

    if (!response.ok) {
        return null;
    }
    const resJson = await response.json()

    return resJson.url
}

async function shortenURL(inputStr) {
    if (inputStr.length < 1) {
        displayErrorMessage("Please, input a url")
        return null
    }
    if (!isUrl(inputStr)){
        displayErrorMessage("input string : ["+ inputStr + "] is not vaild url. Please, provide a valid url")
        return null
    }

    const srcURL = inputStr;

    const dstURL = await requestShortURL(srcURL);

    if (dstURL === undefined || dstURL === null) {
        return null
    }
    return dstURL
}

function onUrlFormChange(event) {
    targetString = urlForm.value.trim()
    const regExp = /^https:\/\/li.inc\/[A-Za-z0-9\-_]{7}/
    if (regExp.test(targetString)){
        changeBtnToCopy()
    }else {
        changeBtnToShorten()
    }
    if (urlForm.value !== targetString){
        urlForm.value = targetString
    }
}

async function copyURL(shortURL) {
    try {
        await navigator.clipboard.writeText(shortURL);
        displayActionMessage('url ['+ shortURL + '] is copied to clipboard');
    } catch (err) {
        displayErrorMessage('url ['+ shortURL + '] is Failed to copy');
        console.error('Failed to copy: ', err);
    }
}

function onCopy() {
    copyURL(urlForm.value).then()
}

function onShorten() {
    hiddenMessage()
    shortenURL(urlForm.value)
        .then((shortURL) => {
            if (shortURL === undefined || shortURL === null) {
                return
            }
            urlForm.value = shortURL
            changeBtnToCopy()
        })
        .catch()
}

function onBtnClick() {
    if (shortenBtn.value === "shorten"){
        onShorten()
    }else{
        onCopy()
    }
}

changeBtnToShorten()
urlForm.addEventListener('input',onUrlFormChange)
urlForm.addEventListener('change',onUrlFormChange)
shortenBtn.addEventListener('click',onBtnClick)