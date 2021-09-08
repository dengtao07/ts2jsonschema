import path from "path";
import * as TJS from "typescript-json-schema";
import fs from 'fs';
import { Validator } from 'jsonschema'
import { Api1, Api2 } from './apis/index'

const schemaId = '/api';

/* transfer typescript interface to json schema */
// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true
};

const program = TJS.getProgramFromFiles(
  [path.join(__dirname, './apis/index.ts')],
  compilerOptions,
);

// iterate all the api interfaces，transfer those to json-schema
let schema = TJS.generateSchema(program, "*", settings) || {};
schema['$id'] = schemaId;

// format json
let newSchema = JSON.stringify(schema, null, 2); 

fs.writeFileSync(path.join(__dirname, "./json-schema", "schema.json"), newSchema); 

/* use jsonschema to validate responses from server */
const apiSchema = require('./json-schema/schema.json')
const v = new Validator();
v.addSchema(apiSchema, schemaId);

Api1().then(res => { 
  const validateRes1 = v.validate(res, { $ref: `api#/definitions/IApi1` })
  console.log(validateRes1);
});
Api2().then(res => { 
  const validateRes2 = v.validate(res, { $ref: `api#/definitions/IApi2` })
  console.log(validateRes2);
});






