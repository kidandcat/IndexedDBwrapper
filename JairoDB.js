var JairoDB = (function () {
    function i(name) {
        var self = this;
        self.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        self.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        self.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        self.name = name;
        if (!self.indexedDB) {
            throw new Error('IndexedDB not supported');
        }
    }

    
    /**
     * @param  {boolean} upgrade
     */
    i.prototype.open = function (upgrade, success, error) {
        var self = this;
        if (upgrade) {
            if (self.version) {
                console.log(self.version);
                var request = self.indexedDB.open(self.name, ++self.version);
                request.onupgradeneeded = function (event) {
                    var db = request.result;
                    self.version = db.version;
                    console.log(self.version);
                    success(event);
                    self.db.close();
                }
                request.onerror = function (event) {
                    console.log('error: ');
                    console.log(event);
                    error(event);
                    self.db.close();
                }
            } else {
                var request2 = self.indexedDB.open(self.name);
                request2.onsuccess = function (event) {
                    self.db = request2.result;
                    self.version = self.db.version;
                    self.db.close();
                    self.open(true, success, error);
                }
            }
        } else {
            var request1 = self.indexedDB.open(self.name);
            request1.onsuccess = function (event) {
                self.db = request1.result;
                self.version = self.db.version;
                success();
                self.db.close();
            }
            request1.onerror = function (event) {
                error(event);
                self.db.close();
            }
        }
    }

    /**
     * @param  config.storeName
     * @param  config.items
     */
    i.prototype.write = function (config, success, error) {
        var self = this;
        self.open(false, function () {
            var objectStore = self.db.transaction(config.storeName, "readwrite").objectStore(config.storeName);
            for (var i in config.items) {
                objectStore.add(config.items[i]);
            }
            success();
        }, error);
    }
    
    /**
     * @param  config.storeName
     * @param  config.key
     */
    i.prototype.readByKey = function (config, success, error) {
        var self = this;
        self.open(false, function () {
            var objectStore = self.db.transaction(config.storeName, "readonly").objectStore(config.storeName);
            var request = objectStore.get(config.key);
            request.onsuccess = function (event) {
                success(event.target.result);
            }
            request.onerror = function (event) {
                error(event);
            }
        }, error);
    }
    /**
     * @param  config.storeName
     * @param  config.key
     */
    i.prototype.deleteByKey = function (config, success, error) {
        var self = this;
        self.open(false, function () {
            var objectStore = self.db.transaction(config.storeName, "readwrite").objectStore(config.storeName);
            var request = objectStore.delete(config.key);
            request.onsuccess = function (event) {
                success(event.target.result);
            }
            request.onerror = function (event) {
                error(event);
            }
        }, error);
    }
    /**
     * @param  storeName
     */
    i.prototype.getAll = function (storeName, success, error) {
        var self = this;
        self.open(false, function () {
            var objectStore = self.db.transaction(storeName, "readonly").objectStore(storeName);
            var items = [];
            var request = objectStore.openCursor();
            request.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    items.push(cursor.value);
                    cursor.continue();
                }
                else {
                    success(items);
                }
            };
            request.onerror = function (event) {
                error(event);
            }
        }, error);
    }
    /**
     * @param  config.storeName
     * @param  config.index
     * @param  config.value
     */
    i.prototype.getByIndex = function (config, success, error) {
        var self = this;
        self.open(false, function () {
            var objectStore = self.db.transaction(config.storeName, "readonly").objectStore(config.storeName);
            var items = [];
            var index = objectStore.index(config.index);
            index.get(config.value).onsuccess = function (event) {
                var request = index.openCursor();
                request.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        items.push(cursor.value);
                        cursor.continue();
                    } else {
                        success(items);
                    }
                };
                request.onerror = function (event) {
                    error(event);
                }
            };
        }, error);
    }
    /**
     * @param  config.storeName
     * @param  config.key
     * @param  {array} config.indexes
     */
    i.prototype.addStore = function (config, success, error) {
        var self = this;
        self.open(true, function (event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore(config.storeName, { keyPath: config.key });

            if (config.indexes) {
                config.indexes.forEach(function (e) {
                    objectStore.createIndex(e.name, e.name, { unique: e.unique });
                });
            }

            objectStore.transaction.oncomplete = function (event) {
                success();
            }
        }, error);
    }
    
    
    //---------------
    return i;
})();







