import translate from "google-translate-api-x";

translate('Ik spreek Engels', {to: 'hi'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});