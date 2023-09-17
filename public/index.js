var copyText = document.getElementById("shortened-url");

function copy_clipboard(){
    copyText.select();
    copyText.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(copyText.value);

}