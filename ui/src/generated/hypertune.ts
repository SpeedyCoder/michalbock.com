/* eslint-disable */

import * as sdk from "hypertune";





const token = `U2FsdGVkX1+MfLKMa4VZoozKphobwPCJ7AnUWwnD8BI=`;

const queryCode = `
  # To set up the SDK, follow the quickstart:
  # https://docs.hypertune.com/quickstart
  
  query FullQuery {
    root 
    # Try uncommenting the line below and passing different args
    # (context: { language: "" })
    {
      posts {
        date
        link
        text
      }
    }
  }
  `;

const query = {"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"posts":{"fieldArguments":{},"fieldQuery":{"BlogPost":{"objectTypeName":"BlogPost","selection":{"date":{"fieldArguments":{},"fieldQuery":null},"link":{"fieldArguments":{},"fieldQuery":null},"text":{"fieldArguments":{},"fieldQuery":null}}}}}}}}}}}};




  
export type Rec3 = {
  language: string;
}

export type Rec2 = {
  context: Rec3;
}

export type Rec = {
  
}
  

  
export class BlogPostNode extends sdk.Node {
  typeName = "BlogPost" as const;

  date(args: Rec = {}): sdk.StringNode {
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

link(args: Rec = {}): sdk.StringNode {
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

text(args: Rec = {}): sdk.StringNode {
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

export class RootNode extends sdk.Node {
  typeName = "Root" as const;

  posts(args: Rec = {}, listFallbackLength = 0): BlogPostNode[] {
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

export function initializeHypertune(
  variableValues: Rec,
  options: sdk.InitializeOptions = {}
): QueryNode {
  const defaultOptions = {
    query
    
    ,token
    ,queryCode
    ,variableValues
    
  }

  return sdk.initialize(
    QueryNode,
    
    { ...defaultOptions, ...options }
  );
}