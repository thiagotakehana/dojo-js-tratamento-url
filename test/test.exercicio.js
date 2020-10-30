/*
    Dada uma URL, desenvolva um programa que indique se a URL é válida ou não
     e, caso seja válida, retorne as suas partes constituintes.

    Exemplos:
  
    Entrada: http://www.google.com/mail/user=fulano        
    Saída:
    protocolo: http
    host: www
    domínio: google.com
    path: mail
    parâmetros: user=fulano
    
    Entrada: ssh://fulano%senha@git.com/
    Saída:
    protocolo: ssh
    usuário: fulano
    senha: senha
    dominio: git.com

    Participantes:
    RENAN
    WELL
    GUS
    LUC
    BARLON
    LOU
    BIA
    TK

    30/10/2020 17h10 as 19h28
*/

// RED GREEN REFACTOR

var assert = require('assert');


function analyseProtocol(url) {
    var protocolo = url.split(":")[0];

    if (protocolo == url) {
        return undefined;
    }

    return protocolo;
}

function analyseHost(url) {
    if (url.split(":").length < 2) {
        return undefined;
    }
    var urlWithoutProtocol = url.split("//")[1];

    var protocolo = url.split(":")[0];
    if (protocolo === "ssh") {
        if (urlWithoutProtocol.split(".")[0]) {
            return undefined;
        }
        return "";
    }
    var host = urlWithoutProtocol.split(".")[0];


    return host;
}

function analyseDomain(url) {
    if (url.split("//").length < 2) {
        return undefined;
    }

    var urlWithoutProtocol = url.split("//")[1];
    var domain = urlWithoutProtocol.split("/")[0];
    domain = domain.split("?")[0];
    domain = domain.replace("www.", "");
    return domain;
}

function analysePath(url) {
    if (url.split("//").length < 2) {
        return undefined;
    }

    var urlWithoutProtocol = url.split("//")[1];
    var domain = urlWithoutProtocol.substr(urlWithoutProtocol.indexOf("/") + 1)
    domain = domain.split("?")[0];
    domain = domain.replace("www.", "");
    return domain;
}

function analyseParameter(url) {
    if (url.split("//").length < 2) {
        return undefined;
    }

    var urlWithoutProtocol = url.split("//")[1];
    var domain = urlWithoutProtocol.substr(urlWithoutProtocol.indexOf("?") + 1)
    domain = domain.split("?")[0];
    domain = domain.replace("www.", "");
    return domain;
}

// const correct = "http://www.pwi.com.br/teste";
const correct = "http://www.pwi.com.br/teste/testao?par=1";
const correctssh = "ssh://fulano%senha@git.com/";
const correcthttp = "http://www.pwi.com.br/teste/testao?par=1";

const incorrect = "www.pwi.com.br";
const incorrecthttp = "www.pwi.com.br";
const incorrectssh = "www.fulano%senha@git.com/";

describe('protocol', function() {

    it('should return incorrect when protocol http is invalid', function() {
        const ret = analyseProtocol(incorrecthttp);
        assert.strictEqual(ret, undefined);
    });

    it('should return correct when protocol http is valid', function() {
        const ret = analyseProtocol(correcthttp);
        assert.strictEqual(ret, "http");
    });

    it('should return incorrect when protocol ssh is invalid', function() {
        const ret = analyseProtocol(incorrectssh);
        assert.strictEqual(ret, undefined);
    });

    it('should return correct when protocol ssh is valid', function() {
        const ret = analyseProtocol(correctssh);
        assert.strictEqual(ret, "ssh");
    });
})

describe('host', function() {
    it('should return undefined when host http is invalid', function() {
        const ret = analyseHost(incorrecthttp);
        assert.strictEqual(ret, undefined);
    });

    it('should return correct when host http is valid', function() {
        const ret = analyseHost(correcthttp);
        assert.strictEqual(ret, "www");
    });

    it('should return undefined when host ssh is invalid', function() {
        const ret = analyseHost(incorrectssh);
        assert.strictEqual(ret, undefined);
    });

    it('should return blank when host ssh is valid', function() {
        const ret = analyseHost(correctssh);
        assert.strictEqual(ret, "");
    });
})


describe('domain', function() {
    it('should return correct when domain http is valid', function() {
        const ret = analyseDomain(correcthttp);
        assert.strictEqual(ret, "pwi.com.br");
    });

    it('should return incorrect when domain http is invalid', function() {
        const ret = analyseDomain(incorrecthttp);
        assert.strictEqual(ret, undefined);
    });

    it('should return correct when domain ssh is valid', function() {
        const ret = analyseDomain(correctssh);
        assert.strictEqual(ret, "pwi.com.br");
    });

    it('should return incorrect when domain ssh is invalid', function() {
        const ret = analyseDomain(incorrectssh);
        assert.strictEqual(ret, undefined);
    });
})


describe('others', function() {
    it('should return correct when path is valid', function() {
        const ret = analysePath(correct);
        assert.strictEqual(ret, "teste/testao");
    });

    it('should return incorrect when path is invalid', function() {
        const ret = analysePath(incorrect);
        assert.strictEqual(ret, undefined);
    });

    it('should return correct when parameter is valid', function() {
        const ret = analyseParameter(correct);
        assert.strictEqual(ret, "par=1");
    });

    it('should return incorrect when parameter is invalid', function() {
        const ret = analyseParameter(incorrect);
        assert.strictEqual(ret, undefined);
    });
});