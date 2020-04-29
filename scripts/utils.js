let getApiUrl = ( ip, port, endpoint ) => "http://".concat ( ip,":", port, "/apis/", endpoint );

let gbreduce = (xs, f) => xs.reduce ( (r, v, i, a, k = f(v) ) => ( (r[k] || (r[k] = []) ).push (v), r), {});

let getUrlVars = () => {

    let vars = {};

    window.location.href.replace ( /[?&]+([^=&]+)=([^&]*)/gi, ( m, key, value ) =>  vars[key] = value );

    return vars;
}

let camelToWords = (text) => {

    var result = text.replace(/([A-Z])/g, " $1");

    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return finalResult;
}

