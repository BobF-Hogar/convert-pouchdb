# Convert PouchDB

This is a Node.js utility to extract PouchDB data into a JSON file.

## How To Use

1. Create the `convert-pouchdb.js` bundle with the `yarn bundle` command.  
(This should also copy the `leveldown.node` file for use by the bundle.)
2. There **must** be an `edgeDatabase` folder under the root where the bundle is located.  Copy the PouchDB files you want extracted here.
3. Run the `yarn test` command to execute the bundle (just an alias for `node ./dist/convert-pouchdb`)
