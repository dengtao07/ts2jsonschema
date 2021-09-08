const path = require("path");
const TJS = require("typescript-json-schema");
const fs = require("fs");

const schemaId = '/api';

/* transfer typescript interface to json schema */
// optionally pass argument to schema generator
const settings = {
  required: true
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true
};

const program = TJS.getProgramFromFiles(
  [path.join(__dirname, '../src/apis/index.ts')],
  compilerOptions,
);

// iterate all the api interfaces，transfer those to json-schema
let schema = TJS.generateSchema(program, "*", settings) || {};
schema['$id'] = schemaId;

// format json
let newSchema = JSON.stringify(schema, null, 2); 

fs.writeFileSync(path.join(__dirname, "../src/json-schema", "schema.json"), newSchema); 







