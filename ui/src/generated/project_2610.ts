/* eslint-disable */

import * as sdk from "hypertune";

const projectId = 2610;

const businessToken = `U2FsdGVkX1/0kAMlF/4a+ubcU1uRkx2uvJpAyC+OCwjnNTLp8zjb6m8PbHkyvvzd`;

const queryCode = `
query InitQuery {
  root {
    posts {
        date
        link
        text
    }
  }
}`;

const query = {"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"posts":{"fieldArguments":{},"fieldQuery":{"BlogPost":{"objectTypeName":"BlogPost","selection":{"date":{"fieldArguments":{},"fieldQuery":null},"link":{"fieldArguments":{},"fieldQuery":null},"text":{"fieldArguments":{},"fieldQuery":null}}}}}}}}}}}};

const fallbackInitData: sdk.FallbackInitData & { [key: string]: unknown } = {"commitId":3356,"reducedExpression":{"id":"LRzdKMRTWm0T_1Q2qjPMR","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"root":{"id":"SG0E0Q5PEpHj1pS643IWb","body":{"id":"L35_9V42Gx2x4k0dPzofD","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"posts":{"id":"-dfO7OdnZ13cFtB1EQvDv","logs":{"evaluations":{"JWrH9KHqKaO2cpTvvfEoy":1},"events":{},"exposures":{}},"type":"ListExpression","items":[{"id":"uEFbMsi3Wlws3Xv4PBDEF","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"date":{"id":"EkjiwQ-WpZth7ZI6ioz5L","logs":{"evaluations":{"EmhqLB1kiMsIyd1RUyOyY":1},"events":{},"exposures":{}},"type":"StringExpression","value":"November 8, 2021","valueType":{"type":"StringValueType"}},"link":{"id":"94FcQuvttZP82ekjwbYBa","logs":{"evaluations":{"6LqPs20bq1cfLJlcVaOQi":1},"events":{},"exposures":{}},"type":"StringExpression","value":"https://medium.com/@michal.bock/software-engineering-interviews-in-2021-37b644253527","valueType":{"type":"StringValueType"}},"text":{"id":"9P5z0sWA1w0ADQhU6LfhC","logs":{"evaluations":{"8BSAI2auxOtHUdkPEF6iz":1},"events":{},"exposures":{}},"type":"StringExpression","value":"Software Engineering Interviews in 2021","valueType":{"type":"StringValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"BlogPost"},"objectTypeName":"BlogPost"},{"id":"BZxjqZMISDQEhiA-f08_8","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"date":{"id":"DcZD1jzgkFZAN06xATmVd","logs":{"evaluations":{"hgQIE7hh34b8wntbxXV2f":1},"events":{},"exposures":{}},"type":"StringExpression","value":"August 30, 2019","valueType":{"type":"StringValueType"}},"link":{"id":"SuhYbkOyRYufO7G7coqMa","logs":{"evaluations":{"Om54sd5nJPtTS8fPq-HZs":1},"events":{},"exposures":{}},"type":"StringExpression","value":"https://medium.com/swlh/managing-groups-of-gorutines-in-go-ee7523e3eaca","valueType":{"type":"StringValueType"}},"text":{"id":"BeEvPWTXshUT4A1UF-Avi","logs":{"evaluations":{"DR_Aj7vvtnqiLXlZlVr0k":1},"events":{},"exposures":{}},"type":"StringExpression","value":"Managing Groups of Goroutines in Go","valueType":{"type":"StringValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"BlogPost"},"objectTypeName":"BlogPost"},{"id":"UtQZoy7GD5IF3ufXoi5rr","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"date":{"id":"4t9eRXTOvRxDXJVDF30t-","logs":{"evaluations":{"1TJi3rFcUSufWV7tgEegZ":1},"events":{},"exposures":{}},"type":"StringExpression","value":"October 10, 2018","valueType":{"type":"StringValueType"}},"link":{"id":"q0bmvpsZkGN-KF7vVXpJz","logs":{"evaluations":{"RBcaaJ_0nTrjtj13GO2jR":1},"events":{},"exposures":{}},"type":"StringExpression","value":"https://medium.com/@michal.bock/deploy-certificate-authority-service-on-kubernetes-21853c152ade","valueType":{"type":"StringValueType"}},"text":{"id":"K8hACY3lUgOOC67WoAFF6","logs":{"evaluations":{"723ndHV7oD6w49azrP-eY":1},"events":{},"exposures":{}},"type":"StringExpression","value":"Deploying Certificate Authority Service on Kubernetes","valueType":{"type":"StringValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"BlogPost"},"objectTypeName":"BlogPost"},{"id":"CKNRT_v2-DgWP4XXqQ4zu","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"date":{"id":"KBRzoaPKiD-AjG0GBGA99","logs":{"evaluations":{"5HRSXfzCu4zhWXQImN8W8":1},"events":{},"exposures":{}},"type":"StringExpression","value":"May 14, 2018","valueType":{"type":"StringValueType"}},"link":{"id":"3sNb6TVKylAJYCtvyZt5W","logs":{"evaluations":{"yQd_K3uMm56S34RH_t8G2":1},"events":{},"exposures":{}},"type":"StringExpression","value":"https://medium.com/@michal.bock/fix-weird-exceptions-when-running-django-tests-f58def71b59a","valueType":{"type":"StringValueType"}},"text":{"id":"GFB3p-kynHmOSv3I0kGpZ","logs":{"evaluations":{"b0kBRyL3PPrn-QxNKMkb8":1},"events":{},"exposures":{}},"type":"StringExpression","value":"Fix weird exceptions when running Django tests","valueType":{"type":"StringValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"BlogPost"},"objectTypeName":"BlogPost"}],"valueType":{"type":"ListValueType","itemValueType":{"type":"ObjectValueType","objectTypeName":"BlogPost"}}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Root"},"objectTypeName":"Root"},"logs":{"events":{},"exposures":{},"evaluations":{}},"type":"FunctionExpression","valueType":{"type":"FunctionValueType","returnValueType":{"type":"ObjectValueType","objectTypeName":"Root"},"parameterValueTypes":[{"type":"ObjectValueType","objectTypeName":"Query_root_args"}]},"parameters":[{"id":"jpB87XLVPZ_qjtNQuae2T","name":"rootArgs"}]}},"metadata":{"permissions":{"user":{},"group":{"team":{"write":"allow"}}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Query"},"objectTypeName":"Query"},"splits":{},"eventTypes":{},"commitConfig":{"splitConfig":{}},"initLogId":0,"commitHash":"6365663479901805","sdkConfig":{"hashPollInterval":1000,"flushLogsInterval":1000,"maxLogsPerFlush":1},"query":{"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"posts":{"fieldArguments":{},"fieldQuery":{"BlogPost":{"objectTypeName":"BlogPost","selection":{"date":{"fieldArguments":{},"fieldQuery":null},"link":{"fieldArguments":{},"fieldQuery":null},"text":{"fieldArguments":{},"fieldQuery":null}}}}}}}}}}}}};

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
      language: string;
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
  
      posts(args: Rec, listFallbackLength = 0): (BlogPostNode)[] {
          const props0 = this.getField("posts", args);
          const expression0 = props0.expression;
  
          return new sdk.Node(props0)._getItems(listFallbackLength).map((props1) => {
            const expression1 = props1.expression;
            
            if (
      expression1 &&
      expression1.type === "ObjectExpression"
      && expression1.objectTypeName === "BlogPost"
    ) {
      return new BlogPostNode(props1);
    }
  
    const node = new BlogPostNode(props1);
    node._logUnexpectedTypeError();
    return node;
          });
      }
      }

export class BlogPostNode extends sdk.Node {
      typeName = "BlogPost" as const;
  
      date(args: Rec): sdk.StringNode {
          const props0 = this.getField("date", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "StringExpression"
      
    ) {
      return new sdk.StringNode(props0);
    }
  
    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }

link(args: Rec): sdk.StringNode {
          const props0 = this.getField("link", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "StringExpression"
      
    ) {
      return new sdk.StringNode(props0);
    }
  
    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }

text(args: Rec): sdk.StringNode {
          const props0 = this.getField("text", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "StringExpression"
      
    ) {
      return new sdk.StringNode(props0);
    }
  
    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }
      }