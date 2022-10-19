// Importação das funções da Calculadora
const calculadora = require("../../src/calculadora")

// Importação do arquivo de massa para o teste de divisão
const massaDivisaoJSON = require("../../vendors/massaUnidade")

test('somar 2 + 3', () => {
    // 1 - Prepara / Configura
    // 1.1 - Valores de entrada
    const numA = 2;
    const numB = 3;

    //1.2 - Resultado esperado
    const resultadoEsperado = 5;

    // 2 - Executa
    //declara a função
    const somarDoisNumeros = calculadora.somarDoisNumeros;
    const resultadoObtido = somarDoisNumeros(numA, numB);

    // 3 - Valida
    expect(resultadoObtido).toBe(resultadoEsperado);

})

test('subtrair 50 - 10', () => {
    // 1 - Configura
    // 1.1 - Valores de entrada/ variaveis
    const numA = 50;
    const numB = 10;

    //1.2 - Resultado esperado
    const resultadoEsperado = 40;

    // 2 - Executa
    //declara a função
    const subtrairDoisNumeros = calculadora.subtrairDoisNumeros;
    const resultadoObtido = subtrairDoisNumeros(numA, numB);

    // 3 - Valida
    expect(resultadoObtido).toBe(resultadoEsperado);

})

test('multiplicar 6 * 3', () => {
    // 1 - Configura
    // 1.1 - Valores de entrada/ variaveis
    const numA = 6;
    const numB = 3;

    //1.2 - Resultado esperado
    const resultadoEsperado = 18;

    // 2 - Executa e Valida
    const multiplicarDoisNumeros = calculadora.multiplicarDoisNumeros;
    expect(multiplicarDoisNumeros(numA, numB)).toBe(resultadoEsperado);

})

// Teste Positivo
test('dividir 8 / 4', () => {
    const numA = 8;
    const numB = 4;
    const resultadoEsperado = 2;
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    expect(dividirDoisNumeros(numA, numB)).toBe(resultadoEsperado);
})

// Teste Negativo / Teste de Exceção (valida as mensagens de erro e se não permite fazer o que não pode fazer)
test('dividir por zero', () => {
    const numA = 1;
    const numB = 0;
    const resultadoEsperado = Infinity;
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    expect(dividirDoisNumeros(numA, numB)).toBe(resultadoEsperado);
})

// Data Driven Test para a função de dividirDoisNumeros (teste com massa da teste)
// Lista / Array / Tuplas  que contém a massa de teste
const massaDivisao = [
    [8, 4, 2],
    [1, 0, Infinity],
    [9, 3, 3],
    [-10, 2, -5],
    [-20, -5, 4]
]

// Script que usa a massa de teste no formato lista - Tupla
test.each(massaDivisao)('Dividir %f / %f', (numA, numB, resultadoEsperado) => {
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    expect(dividirDoisNumeros(numA, numB)).toBe(resultadoEsperado);
})

// Script que usa a massa de teste no formato json - arquivo
// mapeamento para ler o arquivo - entrada
test.each(massaDivisaoJSON.array.map(item => [
    item.numA,
    item.numB,
    item.resultadoEsperado
]))('Divida %f / %f', (numA, numB, resultadoEsperado) => {
    expect(calculadora.dividirDoisNumeros(numA, numB)).toBe(resultadoEsperado);
})
