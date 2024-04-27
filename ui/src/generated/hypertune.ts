/* eslint-disable */

import * as sdk from "hypertune";

export const defaultToken = `U2FsdGVkX1+MfLKMa4VZoozKphobwPCJ7AnUWwnD8BI=`;

export const queryCode = `query FullQuery{root{posts{date link text}}}`;

export const query = {"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"posts":{"fieldArguments":{},"fieldQuery":{"BlogPost":{"objectTypeName":"BlogPost","selection":{"date":{"fieldArguments":{},"fieldQuery":null},"link":{"fieldArguments":{},"fieldQuery":null},"text":{"fieldArguments":{},"fieldQuery":null}}}}}}}}}}}};

function mergeQueryAndArgs(
  query: sdk.Query<sdk.ObjectValueWithVariables>,
  queryArgs: sdk.ObjectValueWithVariables | null,
  unwrapObjectArgs = false
): sdk.Query<sdk.ObjectValueWithVariables> {
  return Object.fromEntries(
    Object.entries(query).map(([objectTypeName, fragment]) => {
      const objectArgs = unwrapObjectArgs
        ? queryArgs &&
          queryArgs[objectTypeName] &&
          queryArgs[objectTypeName] instanceof Object
          ? (queryArgs[objectTypeName] as sdk.ObjectValueWithVariables)
          : null
        : queryArgs;

      return [
        objectTypeName,
        {
          objectTypeName,
          selection: Object.fromEntries(
            Object.entries(fragment.selection).map(
              ([fieldName, { fieldQuery }]) => {
                const fieldArgs =
                  objectArgs &&
                  objectArgs[fieldName] &&
                  objectArgs[fieldName] instanceof Object
                    ? (objectArgs[fieldName] as sdk.ObjectValueWithVariables)
                    : null;

                return [
                  fieldName,
                  {
                    fieldArguments: {
                      ...(fieldArgs && fieldArgs.args
                        ? (fieldArgs.args as sdk.ObjectValueWithVariables)
                        : {}),
                    },
                    fieldQuery: fieldQuery
                      ? mergeQueryAndArgs(fieldQuery, fieldArgs, true)
                      : null,
                  },
                ];
              }
            )
          ),
        },
      ];
    })
  );
}
  
export const vercelFlagDefinitions = {};

export type Rec = {

}

export type Rec3 = {
  language: string;
}

export type Rec2 = {
  context: Rec3;
}

export type BlogPost = {
  date: string;
  link: string;
  text: string;
}

const blogPostFallback = {date:"",link:"",text:""};

export class BlogPostNode extends sdk.Node {
  typeName = "BlogPost" as const;

  get({ fallback = blogPostFallback as BlogPost}: { fallback?: BlogPost } = {}): BlogPost {
    const getQuery = null;
    return this.evaluate(getQuery, fallback) as BlogPost
  }

  /**
   * [Open in UI]({@link https://app.hypertune.com/projects/2610/draft?view=schema&selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22BlogPost%22%2C%22selectedChildName%22%3A%22date%22%7D})
   */
  date({ args = {}, fallback }: { args?: Rec; fallback: string; }): string {
    const props0 = this.getField("date", args);
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in UI]({@link https://app.hypertune.com/projects/2610/draft?view=schema&selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22BlogPost%22%2C%22selectedChildName%22%3A%22link%22%7D})
   */
  link({ args = {}, fallback }: { args?: Rec; fallback: string; }): string {
    const props0 = this.getField("link", args);
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }

  /**
   * [Open in UI]({@link https://app.hypertune.com/projects/2610/draft?view=schema&selected_schema_type=%7B%22type%22%3A%22object%22%2C%22name%22%3A%22BlogPost%22%2C%22selectedChildName%22%3A%22text%22%7D})
   */
  text({ args = {}, fallback }: { args?: Rec; fallback: string; }): string {
    const props0 = this.getField("text", args);
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "StringExpression"
    ) {
      const node = new sdk.StringNode(props0);
      return node.get({ fallback });
    }

    const node = new sdk.StringNode(props0);
    node._logUnexpectedTypeError();
    return node.get({ fallback });
  }
}

export type Root = {
  posts: BlogPost[];
}

const rootFallback = {posts:[]};

export class RootNode extends sdk.Node {
  typeName = "Root" as const;

  get({ fallback = rootFallback as Root}: { fallback?: Root } = {}): Root {
    const getQuery = null;
    return this.evaluate(getQuery, fallback) as Root
  }

  /**
   * [Open in UI]({@link https://app.hypertune.com/projects/2610/draft?view=logic&selected_field_path=root%3Eposts})
   */
  posts({ args = {}, listFallbackLength = 0 }: { args?: Rec; listFallbackLength?: number; } = {}): BlogPostNode[] {
    const props0 = this.getField("posts", args);
    const expression0 = props0.expression;

    return new sdk.Node(props0)._getItems(listFallbackLength).map((props1) => {
      const expression1 = props1.expression;

      if (
        expression1 &&
        expression1.type === "ObjectExpression" &&
        expression1.objectTypeName === "BlogPost"
      ) {
        return new BlogPostNode(props1);
      }
  
      const node = new BlogPostNode(props1);
      node._logUnexpectedTypeError();
      return node;
    });
  }
}

export type Query = {
  root: Root;
}

const queryFallback = {root:{posts:[]}};

export type Rec5 = {
  args: Rec2;
}

export type Rec4 = {
  root: Rec5;
}

export class QueryNode extends sdk.Node {
  typeName = "Query" as const;

  get({ args, fallback = queryFallback as Query}: { args: Rec4; fallback?: Query }): Query {
    const getQuery = mergeQueryAndArgs(query, args);
    return this.evaluate(getQuery, fallback) as Query
  }

  root({ args }: { args: Rec2; }): RootNode {
    const props0 = this.getField("root", args);
    const expression0 = props0.expression;

    if (
      expression0 &&
      expression0.type === "ObjectExpression" &&
      expression0.objectTypeName === "Root"
    ) {
      return new RootNode(props0);
    }

    const node = new RootNode(props0);
    node._logUnexpectedTypeError();
    return node;
  }
}

export type VariableValues = Rec;
export type DehydratedState = sdk.DehydratedState<Query, VariableValues>

export function initHypertune({
  token = defaultToken,
  variableValues = {},
  override,
  ...options
}: { 
  token?: string; 
  variableValues?: VariableValues;
  override?: sdk.DeepPartial<Query> | null;
} & sdk.InitOptions = {}): QueryNode {
  return sdk.init({
    NodeConstructor: QueryNode,
    token,
    query,
    queryCode,
    variableValues,
    override,
    options,
  });
}