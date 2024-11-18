export type Column = {
  name: string
  type: string
  query: string
  comments: Array<{ comment: string; query: string }>
}

export type View = {
  name: string
  columns: Array<Column>
  query: string
  grants: Array<Grant>
  triggers: {
    [triggerName: string]: Trigger
  }
  alterations: Array<TableAlteration>
  owner: string
}

export type Policy = {
  name: string
  query: string
}

export type TableAlteration = {
  query: string
}

export type Grant = {
  query: string
}

export type Trigger = {
  name: string
  functionName: string
  query: string
}

export type Rule = {
  name: string
  query: string
}

export type PgFunction = {
  name: string
  owner: string
  query: string
}
export type Domain = {
  name: string
  owner: string
  type: string
}
export type Sequence = {
  name: string
  query: string
  grants: Array<Grant>
  alterations: Array<TableAlteration>
  owner: string
}

export type Index = {
  name: string
  query: string
}

export type Table = {
  name: string
  columns: Array<Column>
  query: string
  policies: {
    [policyName: string]: Policy
  }
  triggers: {
    [triggerName: string]: Trigger
  }
  rules: {
    [ruleName: string]: Rule
  }
  indexes: {
    [indexName: string]: Index
  }
  alterations: Array<TableAlteration>
  sequences: Array<Sequence>
  grants: Array<Grant>
  owner: string
}

export type Schema = {
  name: string
  tables: {
    [tableName: string]: Table
  }
  views: {
    [viewName: string]: View
  }
  functions: {
    [functionName: string]: PgFunction
  }
  domains: {
    [domainName: string]: Domain
  }
  grants: Array<Grant>
  owner: string
  _tablelessSequences: { [sequenceName: string]: Sequence }
}

export type Extension = {
  name: string
  query: string
}

export type DatabaseTree = {
  schemas: {
    [schemaName: string]: Schema
  }
  misc: Array<{ query: string }>
  extensions: Array<Extension>
}
