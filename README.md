# IndexedDBwrapper

var db = new JairoDB('jairo3');


###db.addStore
              object = {
                  storeName: 'store name',
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
                  storeName: 'store name',
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
                  storeName: 'store name',
                  key: 'property name'
              }
              
              db.readByKey(object, successCallback, errorCallback)



###db.deleteByKey 
              object = {
                  storeName: 'store name',
                  key: 'property name'
              }
              
              db.deleteByKey(object, successCallback, errorCallback)


###db.getAll
              
              db.getAll( (string)storeName, successCallback, errorCallback)



###db.getByIndex 
              object = {
                  storeName: 'store name',
                  index: 'property name',
                  value: 'property value'
              }
              
              db.getByIndex(object, successCallback, errorCallback)
