// Create Doms
const btnSend = document.getElementById("sendURL");
const btnDownload = document.getElementById("downloadBTN");
let input = document.getElementById("Url");
let showResult = document.getElementById("showResult");
let showAll = document.getElementById("showAll");
let showQR = document.getElementById("showQR");
let modalResult = document.getElementById('modal');
let downloadQR = document.getElementById('downloadQR');
let copiedUrl = document.getElementById('copiedUrl');
let shareTo = document.getElementById('shareTo');
let QrImage = document.getElementById('QrImage');
let logo = document.getElementById('logo');


// init qrCode creator
let qrCreate = new QRCode("showQR", {
    width: 167,
    height: 167
});


// On start site function
function setLoad() {

    // disable preloader
    $('body').removeClass('over');
    $('#preloader').addClass('d-none');
    $('#logo').addClass('d-none');
    $('#logo img').addClass('d-none');

    // init toastr options
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // focus input on load
    $("#Url").focus();
    $("#Url").select();
}

// check url
function validURL(str) {
    let pattern = /^(?:http(s)?:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return pattern.test(str);
}

// Main function
function setSendUrl() {

    // get input
    let object = input.value;

    // check input empty or not
    if (object === "") {
        toastr.info("لطفا لینک را وارد کنید");
    }
    else {

        // check url is valid or not
        if (validURL(object)) {

            // convert input to url for get hostname
            let checkLilnkUrl = new URL(object);
            checkLilnkUrl = checkLilnkUrl.hostname.toLowerCase();

            // check converted url is lilnk or not
            if (checkLilnkUrl === "lilnk.ir" || checkLilnkUrl === "www.lilnk.ir") {
                toastr.error("این لینک قبلا توسط ما کوتاه شده است");
            } else {

                // show loader modal
                $('#modalLoader').modal('show');

                // set url for send it to api
                let url = "example" + object;

                // send url and get shorten link
                fetch(url, {
                    headers: {
                        'example': 'example',
                    },
                }).then(request => {
                    return request.json();
                }).then(data => {

                    // show shorten link on site
                    showResult.value = data['url'];

                    // created it for copy link to clipboard
                    copiedUrl.value = "http://" + data['url'];
                    copyLink.innerHTML = "کپی لینک";

                    // create qrCode for shorten link
                    qrCreate.clear(); // clear the code.
                    qrCreate.makeCode(("https://" + data['url'])); // make another code.

                    // copy link to clipboard
                    copyLink.addEventListener('click', function () {
                        /* Select the text field */
                        copiedUrl.select();
                        copiedUrl.setSelectionRange(0, 99999); /* For mobile devices */
                        if (document.execCommand('copy')) {
                            this.innerHTML = "کپی شد";
                            toastr.remove();
                            toastr.success("لینک با موفقیت کپی شد");
                        } else {
                            toastr.remove();
                            toastr.error("لینک کپی نشد");
                        }
                    });

                    // share to button
                    shareTo.addEventListener('click', function () {
                        toastr.remove();
                        toastr.info("برای اشتراک گذاری از اپلیکیشن استفاده کنید");
                    });

                    // download qr code
                    downloadQR.addEventListener('click', function () {

                        // create link
                        let thisUrl = "http://" + data['url'];

                        // import link to url
                        let url = new URL(thisUrl);

                        // create link for download
                        this.download = "lilnk" + url.pathname + ".png";
                        this.href = document.querySelector("#showQR img").getAttribute('src');
                    });

                    // close loader modal
                    $('#modalLoader').modal('hide');

                    // show result modal
                    $('#modalResult').modal('show');
                }).catch(err => {

                    // close loader modal
                    $('#modalLoader').modal('hide');
                    toastr.error("لینک وارد شده نامعتبر می باشد");
                });
            }
        } else {
            toastr.warning("در وارد کردن لینک دقت نمایید");
        }
    }
}


// onload function
window.addEventListener('load', setLoad);

// onclick send
btnSend.addEventListener("click", setSendUrl);

// onEnter send
$('#Url').bind("enterKey", setSendUrl);
$('#Url').keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }
});

// focus and select all input text onclick
input.addEventListener('click', function () {
    $(this).focus();
    $(this).select();
});

// show download center modal
btnDownload.addEventListener('click', function () {
    $('#modalDownload').modal('show');
});