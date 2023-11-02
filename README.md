# Map.get vs Array.find - Qual é a melhor opção para volume massivo de dados?

Certo dia, em um projeto typescript, me deparei com a necessidade de lidar com um volume considerável de dados, ultrapassando os 2GB. Inicialmente, sem preocupações com desempenho, segui o fluxo convencional: carreguei os dados na memória, utilizei filtros, funções find, entre outros. No entanto, ao tentar executar o programa, minha máquina praticamente implorou misericórdia e a execução não rolou (a aplicação era uma lambda e antes que terminasse a execução, deu timeout).

Dado essa introdução, vou demonstrar a diferença de desempenho entre as estruturas de dados Map e Array ao lidar com volumes massivos de informações.

## Cenário:
Vamos supor que temos duas tabelas, "Pessoas" e "Contas", e precisamos filtrar essas tabelas para obter apenas as "Contas" ativas, retornando um objeto com os dados da "Pessoa" associados aos dados da "Conta". Cada uma das tabelas possui 2.5 milhões de registros, sendo que só 49.986 dessas contas estão ativas.

## Desempenho
### Utilizando Array:
```typescript
persons
    .filter((person) => accounts.find((account) => account.personId === person.id).isAccountActive)
    .map((person) => ({
        ...person,
        account: accounts.find((account) => account.personId === person.id)
    }))

// Tempo de execução deste trecho:
// Array.find: 4 minutos e 41 segundos
```

### Utilizando Map:
```typescript
const accountsMap = new Map<string, Account>()
accounts.forEach((account) => {
    accountsMap.set(account.personId, account)
});

persons
    .filter((person) => accountsMap.get(person.id)?.isAccountActive)
    .map((person) => ({
        ...person,
        account: accountsMap.get(person.id)
    }))

// Tempo de execução deste trecho:
// Map.get: 168 milissegundos
```

Observe que, ao criar o Map, foi necessário percorrer todos os dados de "Contas" para criar a nova estrutura, no entanto, o desempenho resultante foi absurdamente superior. Neste cenário, fica evidente que o Map oferece um desempenho muito superior em relação ao Array.

Conclusão, ao lidar com grandes volumes de dados usando javascript, considerar a estrutura de Map pode ser uma escolha inteligente para otimizar o desempenho de suas operações, como exemplificado neste post.


Você encontra o código completo nesse repositório:
https://github.com/delucagabriel/ts_map_vs_array





