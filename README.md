# IndexedDBwrapper


var db = new JairoDB('jairo3');

db.addStore({
    storeName: 'coche10',
    key: 'color10',
    indexes: [
        {
            name: 'nombre',
            unique: false
        },
        {
            name: 'ruedas',
            unique: false
        }
    ]
}, function () {
    console.log('done');
    write();
}, function () {
    console.log('error1');
});


function write() {
    db.write({
        storeName: 'coche10',
        items: [
            {
                color10: 'verde',
                nombre: 'juan',
                ruedas: 5
            },
            {
                color10: 'rojo',
                nombre: 'juan',
                ruedas: 5
            }
        ]
    }, function () {
        console.log('done');
        read();
    }, function () {
        console.log('error2');
    });
}

function read() {
    db.readByKey({
        storeName: 'coche10',
        key: 'rojo',
    }, function (s) {
        console.log(s);
    }, function () {
        console.log('error3');
    });
}
