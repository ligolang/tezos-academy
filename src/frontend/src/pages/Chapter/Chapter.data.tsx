import { data as camelDataAddresses } from '../Chapters/Camel/ChapterAddresses'
import { data as camelDataBuiltIns } from '../Chapters/Camel/ChapterBuiltIns'
import { data as camelDataConditionals } from '../Chapters/Camel/ChapterConditionals'
import { data as camelDataDeployContract } from '../Chapters/Camel/ChapterDeployContract'
import { data as camelDataFA12 } from '../Chapters/Camel/ChapterFA12'
import { data as camelDataFunctions } from '../Chapters/Camel/ChapterFunctions'
import { data as camelDataInteractions } from '../Chapters/Camel/ChapterInteractions'
import { data as camelDataInterop } from '../Chapters/Camel/ChapterInterop'
import { data as camelDataLambda } from '../Chapters/Camel/ChapterLambda'
import { data as camelDataLists } from '../Chapters/Camel/ChapterLists'
import { data as camelDataLoops } from '../Chapters/Camel/ChapterLoops'
import { data as camelDataMainFunction } from '../Chapters/Camel/ChapterMainFunction'
import { data as camelDataMaps } from '../Chapters/Camel/ChapterMaps'
import { data as camelDataMath } from '../Chapters/Camel/ChapterMath'
import { data as camelDataMultisig } from '../Chapters/Camel/ChapterMultisig'
import { data as camelDataOption } from '../Chapters/Camel/ChapterOption'
import { data as camelDataPolymorphism } from '../Chapters/Camel/ChapterPolymorphism'
import { data as camelDataPreprocessor } from '../Chapters/Camel/ChapterPreprocessor'
import { data as camelDataRecords } from '../Chapters/Camel/ChapterRecords'
import { data as camelDataStrings } from '../Chapters/Camel/ChapterStrings'
import { data as camelDataTimestamps } from '../Chapters/Camel/ChapterTimestamps'
import { data as camelDataTransactions } from '../Chapters/Camel/ChapterTransactions'
import { data as camelDataTuples } from '../Chapters/Camel/ChapterTuples'
import { data as camelDataTypes } from '../Chapters/Camel/ChapterTypes'
import { data as camelDataVariables } from '../Chapters/Camel/ChapterVariables'
import { data as camelDataVariant } from '../Chapters/Camel/ChapterVariant'
/* prettier-ignore */

import { data as jsDataAddresses } from '../Chapters/JS/ChapterAddresses'
import { data as jsDataBuiltIns } from '../Chapters/JS/ChapterBuiltIns'
import { data as jsDataConditionals } from '../Chapters/JS/ChapterConditionals'
import { data as jsDataDeployContract } from '../Chapters/JS/ChapterDeployContract'
import { data as jsDataFA12 } from '../Chapters/JS/ChapterFA12'
import { data as jsDataFunctions } from '../Chapters/JS/ChapterFunctions'
import { data as jsDataInteractions } from '../Chapters/JS/ChapterInteractions'
import { data as jsDataInterop } from '../Chapters/JS/ChapterInterop'
import { data as jsDataLambda } from '../Chapters/JS/ChapterLambda'
import { data as jsDataLists } from '../Chapters/JS/ChapterLists'
import { data as jsDataLoops } from '../Chapters/JS/ChapterLoops'
import { data as jsDataMainFunction } from '../Chapters/JS/ChapterMainFunction'
import { data as jsDataMaps } from '../Chapters/JS/ChapterMaps'
import { data as jsDataMath } from '../Chapters/JS/ChapterMath'
import { data as jsDataMultisig } from '../Chapters/JS/ChapterMultisig'
import { data as jsDataOption } from '../Chapters/JS/ChapterOption'
import { data as jsDataPolymorphism } from '../Chapters/JS/ChapterPolymorphism'
import { data as jsDataPreprocessor } from '../Chapters/JS/ChapterPreprocessor'
import { data as jsDataRecords } from '../Chapters/JS/ChapterRecords'
import { data as jsDataStrings } from '../Chapters/JS/ChapterStrings'
import { data as jsDataTimestamps } from '../Chapters/JS/ChapterTimestamps'
import { data as jsDataTransactions } from '../Chapters/JS/ChapterTransactions'
import { data as jsDataTuples } from '../Chapters/JS/ChapterTuples'
import { data as jsDataTypes } from '../Chapters/JS/ChapterTypes'
import { data as jsDataVariables } from '../Chapters/JS/ChapterVariables'
import { data as jsDataVariant } from '../Chapters/JS/ChapterVariant'

export const chapterData = [
  {
    pathname: '/js/chapter-about',
    language: 'JsLIGO',
    name: '1 - JS - About',
    data: { course: undefined, exercise: undefined, solution: undefined, supports: {} },
  },
  { pathname: '/js/chapter-types', language: 'JsLIGO', name: '2 - JS - Types', data: jsDataTypes },
  {
    pathname: '/js/chapter-variables',
    language: 'JsLIGO',
    name: '3 - JS - Variables',
    data: jsDataVariables,
  },
  { pathname: '/js/chapter-math', language: 'JsLIGO', name: '4 - JS - Math', data: jsDataMath },
  { pathname: '/js/chapter-strings', language: 'JsLIGO', name: '5 - JS - Strings', data: jsDataStrings },
  {
    pathname: '/js/chapter-functions',
    language: 'JsLIGO',
    name: '6 - JS - Functions',
    data: jsDataFunctions,
  },
  {
    pathname: '/js/chapter-conditionals',
    language: 'JsLIGO',
    name: '7 - JS - Conditionals',
    data: jsDataConditionals,
  },
  { pathname: '/js/chapter-tuples', language: 'JsLIGO', name: '8 - JS - Tuples', data: jsDataTuples },
  { pathname: '/js/chapter-records', language: 'JsLIGO', name: '9 - JS - Records', data: jsDataRecords },
  { pathname: '/js/chapter-lists', language: 'JsLIGO', name: '10 - JS - Lists', data: jsDataLists },
  { pathname: '/js/chapter-maps', language: 'JsLIGO', name: '11 - JS - Maps', data: jsDataMaps },
  {
    pathname: '/js/chapter-variants',
    language: 'JsLIGO',
    name: '12 - JS - Variants',
    data: jsDataVariant,
  },
  {
    pathname: '/js/chapter-main-function',
    language: 'JsLIGO',
    name: '13 - JS - Main function',
    data: jsDataMainFunction,
  },
  { pathname: '/js/chapter-loops', language: 'JsLIGO', name: '14 - JS - Loops', data: jsDataLoops },
  {
    pathname: '/js/chapter-addresses',
    language: 'JsLIGO',
    name: '15 - JS - Addresses',
    data: jsDataAddresses,
  },
  {
    pathname: '/js/chapter-built-ins',
    language: 'JsLIGO',
    name: '16 - JS - Built-ins',
    data: jsDataBuiltIns,
  },
  {
    pathname: '/js/chapter-transactions',
    language: 'JsLIGO',
    name: '17 - JS - Transactions',
    data: jsDataTransactions,
  },
  {
    pathname: '/js/chapter-timestamps',
    language: 'JsLIGO',
    name: '18 - JS - Timestamps',
    data: jsDataTimestamps,
  },
  { pathname: '/js/chapter-option', language: 'JsLIGO', name: '19 - JS - Option', data: jsDataOption },
  {
    pathname: '/js/chapter-interactions',
    language: 'JsLIGO',
    name: '20 - JS - Interactions',
    data: jsDataInteractions,
  },
  {
    pathname: '/js/chapter-lazyinteraction',
    language: 'JsLIGO',
    name: '21 - JS - Lazy interaction',
    data: jsDataPolymorphism,
  },
  {
    pathname: '/js/chapter-lambda',
    language: 'JsLIGO',
    name: '22 - JS - Lambda',
    data: jsDataLambda,
  },
  {
    pathname: '/js/chapter-deploycontract',
    language: 'JsLIGO',
    name: '23 - JS - Deploy contract',
    data: jsDataDeployContract,
  },
  {
    pathname: '/js/chapter-multisig',
    language: 'JsLIGO',
    name: '24 - JS - Multisignature',
    data: jsDataMultisig,
  },
  {
    pathname: '/js/chapter-interop',
    language: 'JsLIGO',
    name: '25 - JS - Interoperability',
    data: jsDataInterop,
  },
  {
    pathname: '/js/chapter-preprocessor',
    language: 'JsLIGO',
    name: '26 - JS - Preprocessor',
    data: jsDataPreprocessor,
  },
  {
    pathname: '/js/chapter-fa12',
    language: 'JsLIGO',
    name: '27 - JS - Fungible token (FA1.2)',
    data: jsDataFA12,
  },
  /* { */
  /*   pathname: '/js/chapter-fa2', */
  /*   language: 'JsLIGO', */
  /*   name: '28 - JS - Fungible token (FA2)', */
  /*   data: jsDataFA20, */
  /* }, */
  /* { */
  /*   pathname: '/js/chapter-fa2-operator', */
  /*   language: 'JsLIGO', */
  /*   name: '29 - JS - Non fungible token with FA2 (Operator)', */
  /*   data: jsDataFA20Operator, */
  /* }, */
  /* { */
  /*   pathname: '/js/chapter-fa2-hook', */
  /*   language: 'JsLIGO', */
  /*   name: '30 - JS - FA2 Hook', */
  /*   data: jsDataFA20Hook, */
  /* }, */

  {
    pathname: '/camel/chapter-about',
    language: 'CameLIGO',
    name: '1 - Camel - About',
    data: { course: undefined, exercise: undefined, solution: undefined, supports: {} },
  },
  { pathname: '/camel/chapter-types', language: 'CameLIGO', name: '2 - Camel - Types', data: camelDataTypes },
  {
    pathname: '/camel/chapter-variables',
    language: 'CameLIGO',
    name: '3 - Camel - variables',
    data: camelDataVariables,
  },
  { pathname: '/camel/chapter-math', language: 'CameLIGO', name: '4 - Camel - Math', data: camelDataMath },
  { pathname: '/camel/chapter-strings', language: 'CameLIGO', name: '5 - Camel - Strings', data: camelDataStrings },
  {
    pathname: '/camel/chapter-functions',
    language: 'CameLIGO',
    name: '6 - Camel - Functions',
    data: camelDataFunctions,
  },
  {
    pathname: '/camel/chapter-conditionals',
    language: 'CameLIGO',
    name: '7 - Camel - Conditionals',
    data: camelDataConditionals,
  },
  { pathname: '/camel/chapter-tuples', language: 'CameLIGO', name: '8 - Camel - Tuples', data: camelDataTuples },
  { pathname: '/camel/chapter-records', language: 'CameLIGO', name: '9 - Camel - Records', data: camelDataRecords },
  { pathname: '/camel/chapter-maps', language: 'CameLIGO', name: '10 - Camel - Maps', data: camelDataMaps },
  { pathname: '/camel/chapter-lists', language: 'CameLIGO', name: '11 - Camel - Lists', data: camelDataLists },
  { pathname: '/camel/chapter-variants', language: 'CameLIGO', name: '12 - Camel - Variants', data: camelDataVariant },
  {
    pathname: '/camel/chapter-main-function',
    language: 'CameLIGO',
    name: '13 - Camel - Main function',
    data: camelDataMainFunction,
  },
  { pathname: '/camel/chapter-loops', language: 'CameLIGO', name: '14 - Camel - Loops', data: camelDataLoops },
  {
    pathname: '/camel/chapter-addresses',
    language: 'CameLIGO',
    name: '15 - Camel - Addresses',
    data: camelDataAddresses,
  },
  {
    pathname: '/camel/chapter-built-ins',
    language: 'CameLIGO',
    name: '16 - Camel - Built-ins',
    data: camelDataBuiltIns,
  },
  {
    pathname: '/camel/chapter-transactions',
    language: 'CameLIGO',
    name: '17 - Camel - Transactions',
    data: camelDataTransactions,
  },
  {
    pathname: '/camel/chapter-timestamps',
    language: 'CameLIGO',
    name: '18 - Camel - Timestamps',
    data: camelDataTimestamps,
  },
  { pathname: '/camel/chapter-option', language: 'CameLIGO', name: '19 - Camel - Option', data: camelDataOption },
  {
    pathname: '/camel/chapter-interactions',
    language: 'CameLIGO',
    name: '20 - Camel - Interactions',
    data: camelDataInteractions,
  },
  {
    pathname: '/camel/chapter-lazyinteraction',
    language: 'CameLIGO',
    name: '21 - Camel - Lazy interaction',
    data: camelDataPolymorphism,
  },
  {
    pathname: '/camel/chapter-lambda',
    language: 'CameLIGO',
    name: '22 - Camel - Lambda',
    data: camelDataLambda,
  },
  {
    pathname: '/camel/chapter-deploycontract',
    language: 'CameLIGO',
    name: '23 - Camel - Deploy contract',
    data: camelDataDeployContract,
  },
  {
    pathname: '/camel/chapter-multisig',
    language: 'CameLIGO',
    name: '24 - Camel - Multisignature',
    data: camelDataMultisig,
  },
  {
    pathname: '/camel/chapter-interop',
    language: 'CameLIGO',
    name: '25 - Camel - Interoperability',
    data: camelDataInterop,
  },
  {
    pathname: '/camel/chapter-preprocessor',
    language: 'CameLIGO',
    name: '26 - Camel - Preprocessor',
    data: camelDataPreprocessor,
  },
  {
    pathname: '/camel/chapter-fa12',
    language: 'CameLIGO',
    name: '27 - Camel - Fungible token (FA1.2)',
    data: camelDataFA12,
  },

]
