(function () {
    let setting = {"height":540,"width":1110,"zoom":9,"queryString":"Москва, Россия","place_id":"ChIJybDUc_xKtUYRTM9XV8zWRD0","satellite":false,"centerCoord":[55.584485550231534,37.38552349727848],"cid":"0x3d44d6cc5757cf4c","lang":"ru","cityUrl":"/russia/moscow","cityAnchorText":"Карта [CITY1], Central Federal District, Россия","id":"map-9cd199b9cc5410cd3b1ad21cab2e54d3","embed_id":"348611"};
    let d = document;
    let s = d.createElement('script');
    s.src = 'https://1map.com/js/script-for-user.js?embed_id=348611';
    s.async = true;
    s.onload = function (e) {
        window.OneMap.initMap(setting)
    };
    let to = d.getElementsByTagName('script')[0];
    to.parentNode.insertBefore(s, to);
})();