const { describe } = require("mocha");

// v1 testing
// https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API

describe('ArboParse', function() {
    describe('#parse()', function() {
        it('should be able to parse a file')
        it('should be able to parse a string')
        it('should throw an error when the input is invalid')
        it('should return ProgramNode object')
    })
})

describe('RootNode', function() {
    it('should have a type field of type string')
    it('should have a loc field of type SourceLocation or null')

    describe('.SourceLocation', function() {
        it('should have a source field of type string or null')
        it('should have a start field of type Position')
    })

    describe('.Position', function() {
        it('should have a line field of type number')
        it('should have a column field of type number')
    })
})

describe('ProgramNode', function() {
    it('should extend RootNode')
    it('should have the type field be "Program"')
    it('should have a body field of type StatementNode[]')
})

describe('FunctionNode', function() {
    it('should have an id field of type Identifier or null')
    it('should have a params field of type Pattern[]')
    it('should have a defaults field of type Expression[]')
    it('should have a rest field of type Identifier or null')
    it('should have a body field of type BlockStatement or Expression')
    it('should have a generator field of type boolean')
    it('should have an expression field of type boolean')
})

describe('StatementNode', function() {
    it('should extend type ArboNode')

    describe('EmptyStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "EmptyStatement"')
    })

    describe('BlockStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "BlockStatemnet"')
        it('should have a body field of type StatementNode[]')
    })

    describe('ExpressionStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ExpressionStatement')
        it('should have an expression field of type Expression')
    })

    describe('IfStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "IfStatement"')
        it('should have a test field of type Expression')
        it('should have a consequent field of type StatementNode')
        it('should have an altername field of type StatementNode or null')
    })

    describe('LabeledStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "LabeledStatement"')
        it('should have a label field of type Identifier')
        it('should have a body field of type Statement')
    })

    describe('BreakStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "BreakStatement"')
        it('should have a label field of type Identifier or null')
    })

    describe('ContinueStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ContinueStatement"')
        it('should have a label field of type Identifier or null')
    })

    describe('WithStatemnetNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "WithStatement"')
        it('should have an object field of type Expression')
        it('should have a body field of type StatementNode')
    })

    describe('SwitchStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "SwitchStatemnet"')
        it('should have a discriminant field of type Expression')
        it('should have a cases field of type SwitcheCase[]')
        it('should have a lexical field of type boolean')
    })

    describe('ReturnStatemnetNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ReturnStatement')
        it('should have an argument field of type Expression or null')
    })

    describe('ThrowStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ThrowStatement"')
        it('should have an argumnet field of type Expression')
    })

    describe('TryStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "TryStatement"')
        it('should have a block field of type BlockStatementNode')
        it('should have a handler field of type CatchClause of null')
        it('should have a guardedHandlers field of type CatchClause[]')
        it('should have a finalizer field of type BlockStatementNode or null')
    })

    describe('WhileStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "WhileStatement"')
        it('should have a test field of type Expression')
        it('should have a body field of type StatementNode')
    })

    describe('DoWhileStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "DoWhileStatement')
        it('should have a body field of type StatementNode')
        it('should have a test field of type Expression')
    })

    describe('ForStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ForStatement"')
        it('should have an init field of type VeriableDeclaration or Expression or null')
        it('should have a test field of type Expression or null')
        it('should have an update field of type Expression or null')
        it('should have a body field of type StatementNode')
    })

    describe('ForInStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ForInStatement')
        it('should have a left field of type VariableDeclaration or Expression')
        it('should have a right field of type Expression')
        it('should have a body field of type StatementNode')
        it('should have an each field of type boolean')
    })

    describe('ForOfStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "ForOfStatement')
        it('should have a left field of type VariableDeclariation or Expression')
        it('should have a right field of type Expression')
        it('should have a body field of type StatementNode')
    })

    describe('LetStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "LetStatement')
        it('should have a head field of type VariableDeclarator[]')
        it('should have a body field of type StatementNode')
    })

    describe('DebuggerStatementNode', function() {
        it('should extend type StatementNode')
        it('should have a type field of "DebuggerStatement')
    })

    describe('DeclarationStatement', function() {
        it('should extend type StatementNode')

        describe('FunctionDeclarationStatement', function() {
            it('should extend type FunctionNode')
            it('should extend type DeclarationStatement')
            it('should have a type field of "FunctionDeclaration')
            it('should have an id field of type Identifier')
            it('should have a params field of type Pattern[]')
            it('should have a defaults field of type Expression[]')
            it('should have a rest field of type Identifier or null')
            it('should have a body field of type BlockStatementNode or Expression')
            it('should have a generator field of type boolean')
            it('should have an expression field of type boolean')
        })
    })
})

