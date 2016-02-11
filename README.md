# IndexedDBwrapper

var db = new JairoDB('jairo3');


###addStore
              object = {
                  storeName: 'string',
                  key:       'property of object',
                  indexes(optional):  (array of objects)
                      [
                          {
                              name: 'object property name',
                              unique: false
                          },
                          {
                              name: 'object property name',
                              unique: false
                          },
                          {
                              name: 'object property name',
                              unique: false
                          }
                      ]
              }
              db.addStore(object, successCallback, errorCallback)





