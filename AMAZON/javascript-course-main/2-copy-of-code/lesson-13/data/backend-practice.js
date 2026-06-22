const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GEt','https://supersimplebackend.dev/');
xhr.send();
