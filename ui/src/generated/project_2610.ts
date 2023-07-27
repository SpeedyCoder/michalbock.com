/* eslint-disable */

import * as sdk from "hypertune";

const projectId = 2610;

const businessToken = `U2FsdGVkX1/0kAMlF/4a+ubcU1uRkx2uvJpAyC+OCwjnNTLp8zjb6m8PbHkyvvzd`;

const queryCode = `
query InitQuery {
  root {
    exampleFlag
  }
}`;

const query = {"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"exampleFlag":{"fieldArguments":{},"fieldQuery":null}}}}}}}};

const fallbackInitData: sdk.FallbackInitData & { [key: string]: unknown } = {"commitId":3350,"reducedExpression":{"id":"LRzdKMRTWm0T_1Q2qjPMR","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"root":{"id":"SG0E0Q5PEpHj1pS643IWb","body":{"id":"L35_9V42Gx2x4k0dPzofD","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"exampleFlag":{"id":"tqPgdqqmdNVU1tgZ1Mm_F","logs":{"evaluations":{"XW5O4w23IHbpTp1otdT6h":1},"events":{},"exposures":{}},"type":"SwitchExpression","cases":[{"when":{"a":{"id":"g02YzkrC-9CVb-bJgYaDs","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"GetFieldExpression","object":{"id":"WjJRoARx7cy2Xx8weL7fL","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"VariableExpression","valueType":{"type":"ObjectValueType","objectTypeName":"Query_root_args"},"variableId":"jpB87XLVPZ_qjtNQuae2T"},"fieldPath":"context > user > id","valueType":{"type":"StringValueType"}},"b":{"id":"E2rxtbstOD5UQn_lppCNJ","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ListExpression","items":[{"id":"pFlCMyutN98QP-PpKkXja","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"StringExpression","value":"user_123","valueType":{"type":"StringValueType"}},{"id":"AU16uIfpCDI983wByK1V3","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"StringExpression","value":"user_456","valueType":{"type":"StringValueType"}}],"valueType":{"type":"ListValueType","itemValueType":{"type":"StringValueType"}}},"id":"02jHAtZN1gf5hz1BXNJs0","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ComparisonExpression","operator":"in","valueType":{"type":"BooleanValueType"}},"then":{"id":"LA6jWQb99SN-LQv37ixbr","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":true,"valueType":{"type":"BooleanValueType"}}}],"control":{"id":"ehXhLNmuYSzXunBqaQmty","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":true,"valueType":{"type":"BooleanValueType"}},"default":{"id":"9z3VkSpqUNhSMaajW-kaT","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":false,"valueType":{"type":"BooleanValueType"}},"valueType":{"type":"BooleanValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Root"},"objectTypeName":"Root"},"logs":{"events":{},"exposures":{},"evaluations":{}},"type":"FunctionExpression","valueType":{"type":"FunctionValueType","returnValueType":{"type":"ObjectValueType","objectTypeName":"Root"},"parameterValueTypes":[{"type":"ObjectValueType","objectTypeName":"Query_root_args"}]},"parameters":[{"id":"jpB87XLVPZ_qjtNQuae2T","name":"rootArgs"}]}},"metadata":{"permissions":{"user":{},"group":{"team":{"write":"allow"}}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Query"},"objectTypeName":"Query"},"splits":{},"eventTypes":{},"commitConfig":{"splitConfig":{}},"initLogId":0,"commitHash":"8092958093042232","sdkConfig":{"hashPollInterval":1000,"flushLogsInterval":1000,"maxLogsPerFlush":1},"query":{"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"exampleFlag":{"fieldArguments":{},"fieldQuery":null}}}}}}}}};

export function initializeHypertune(
  variableValues: Rec,
  options: sdk.InitializeOptions = {}
): QueryNode {
  const defaultOptions = { businessToken, query, fallbackInitData };

  return sdk.initialize(
    QueryNode,
    projectId,
    queryCode,
    variableValues,
    { ...defaultOptions, ...options }
  );
}

// Enum types


  
// Input object types

export type Rec = {
      
      //
      };

export type Rec2 = {
      context: Rec3;
      //
      };

export type Rec3 = {
      user: Rec4;
      //
      };

export type Rec4 = {
      id: string;
name: string;
email: string;
      //
      };
  
// Enum node classes


  
// Fragment node classes

export class QueryNode extends sdk.Node {
      typeName = "Query" as const;
  
      root(args: Rec2): RootNode {
          const props0 = this.getField("root", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "ObjectExpression"
      && expression0.objectTypeName === "Root"
    ) {
      return new RootNode(props0);
    }
  
    const node = new RootNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }
      }

export class RootNode extends sdk.Node {
      typeName = "Root" as const;
  
      exampleFlag(args: Rec): sdk.BooleanNode {
          const props0 = this.getField("exampleFlag", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "BooleanExpression"
      
    ) {
      return new sdk.BooleanNode(props0);
    }
  
    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }
      }