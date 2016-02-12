# IndexedDBwrapper

var db = new JairoDB('jairo3');


###db.addStore
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


###db.write
              object = {
                  storeName: 'string',
                  items:  (array of objects)
                      [
                          myObject1,
                          myObject2,
                          myObject3
                      ]
              }
              
              db.write(object, successCallback, errorCallback)



###db.readByKey
              object = {
                  storeName: 'string',
                  key: 'string'
              }
              
              db.readByKey(object, successCallback, errorCallback)



###db.deleteByKey 
              object = {
                  storeName: 'string',
                  key: 'string'
              }
              
              db.deleteByKey(object, successCallback, errorCallback)
