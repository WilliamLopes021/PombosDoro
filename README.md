# React e seus Fundamentos

## Strict Mode

O Strict Mode é uma ferramenta do React que ajuda a identificar problemas no código.
Ele é um "enfeite" que não afeta o código em produção, mas ajuda a identificar problemas no código em desenvolvimento.

## CSS Modules e escopo

Existem dpis tipos de escopo ao utilizar CSS em aplicações React a global e a modular. O CSS global é o comum, aquele que podem ser criadas variáveis e estas podem ser acessadas por toda aplicação. O CSS modular é aquele que as variáveis são criadas e estas só podem ser acessadas pelo arquivo onde foram criadas. Para utilizar CSS modular é preciso que o arquivo tenha a extensão `.module.css`. Dentro do arquivo ele é utilizado da seguinte forma:

```JSX
import styles from "./styles.module.css";

const App = () => {
  return (
    <div>
      <h1 className={styles.title}>Hello World</h1>
    </div>
  )
};

export default App;
```

## Propriedades de Componentes (props) e children

Todo componente quando é criado recebe um objeto vazio como argumento. Esse objeto vem vazio por padrão, mas, para popular ele, basta enviar valores para ele através de atributos dentro da tag do componente ou envolvendo um valor que você queira passar entre as tags deste componente. Esta última maneira de passar props se chama children. Então, seguindo o exemplo, pode ser visto os dois tipos de props que podem ser passados para um componente.

```TSX
// Componente utilizando os props
import styles from "./styles.module.css";

const Component = (props: { title: string, children: React.ReactNode }) => {
  return (
    <div>
      <div className={styles.title}>
        <h1>
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  )
};


// Passando os props para o componente

const OutroComponent = () => {
  return (
    <div>
    <Component title="Título">
      <p>Parágrafo</p>
    </Component>
    </div>
  )
};

```

## Gerenciamento de Estados

A inserção e manipulação de dados dinâmicos em componentes TSX/JSX devem ser feitos através de estados. Um estado é uma variável que pode ser alterada e que, quando alterada, faz com que o componente seja renderizado novamente. O uso desse hook, assim que são chamados as funções de gerenciamento do `React`, fornece dois elementos: a variável que guarda o valor e uma função que possui a funcionalidade de alterar o valor desta variável:

```TSX

//     valor     funcao         hook     tipagem  valor inicial
const [variavel, setVariavel] = useState<string>('valorInicial');

setVariavel('novoValor');
```

Existem algumas especificações ao utilizar este hook, como, por exemplo, ao atualizar o valor da variável e esta atualização depender do valor anterior, deve-se passar dentro da função de alteração de estado um callback que recebe o valor anterior como argumento:

```TSX

const [contador, setContador] = useState<number>(0);

setContador((valorAnterior) => valorAnterior + 1);
```

Outra especificação é em relação ao valor inicial do estado. Se ele precisar passar por um processo, pode-se utilizar uma função que retorna o valor inicial, dessa maneira ele vai rodar somente uma vez e quando o componente for renderizado novamente, ele não vai rodar o processo novamente. Exemplo:

```TSX

const [contador, setContador] = useState<number>(() => {
  let valor = 0;
  for (let i = 0; i < 10; i++) {
    valor += i;
  }
  return valor;
});

```

É importante ressaltar que, quando o estado é uma array ou um objeto (valores passados como referência), ao mutar eles corretamente, é necessário retornar uma cópia da array ou do objeto. Desta maneira o React entende que ele foi modificado por se tratar de um "novo valor", e não apenas uma referência ao mesmo valor. É possível fazer isso utilizando o operador spread (`...`). Isso tamém vale para objetos/arrays aninhadas.

### Props Drilling

Props drilling é um problema que ocorre quando um componente precisa passar props para um componente que não é seu filho direto, mas sim um neto ou bisneto. Para resolver isso, é preciso passar os props para todos os componentes intermediários, o que pode ser tedioso e ineficiente. Para resolver isso pode se fazer uso de Context API ou Redux.

## Context API

Para criar um contexto `readonly`, isto é, um contexto somente para transmitir dados, pode-se criar dessa maneira:

```TSX

import { createContext } from "react";

const TaskContext = createContext({
  chave: "valor a ser transmitido",
});

export default TaskContext;

```

E para acessar o valor deste contexto:

```TSX
const Timer = () => {
  const taskContextValue = useContext(TaskContext);
  console.log(taskContextValue);
  /*
  {chave: 'valor a ser transmitido'}
   */

  return (
    <>
      <span className={styles.time}>00:00</span>
    </>
  );
};

export default Timer;
```

### Providers

Um contexto permite um acesso a um provedor (provider) que transmite o valor colocado naquele contexto para os componentes. O provider é capaz de envolver outros componentes e transmitir o valor do contexto para filhos e e netos deste contexo.

```TSX
const App = () => {
  return (
    // Home e seus filhos receberão o valor passado pelo provider
    <TaskContext.Provider value={{chave: 'lsacopioj'}}>
      <Home />
    </TaskContext.Provider>
  );
};

```

---

## Efeitos Colaterais e useEffect (effect de efeito colateral!)

Tudo aquilo que o React não sabe, aquilo que é executado fora do ciclo de vida do componente, é chamado de efeito colateral. Ciclo de vida de componente é o período em que o componente é criado, renderizado e destruído, então, em outras palavra, se algo for feito fora do escopo do React, é um efeito colateral. Alguns exemplos de efeitos colaterais são: manipulação do DOM com JavaScript puro, inserção de dados em um banco de dados, inserção de dados em um arquivo, etc.

---

Para que um efeito colateral seja executado, é preciso que ele seja chamado dentro de um hook chamado `useEffect`. O `useEffect` é um hook específico para lidar com efeitos colaterais. Ele recebe como primeiro argumento uma função callback que será executada após a renderização do componente, mas, ele pode receber um segundo argumento que é um array de dependências- dependências porque, como o próprio nome diz, são elementos que dependem do efeito colateral para serem executados.

```TSX

// Quando utilizado dessa maneira ele executa toda vez que o componente é renderizado.
// Ou seja, quando um estado dentro do componente mudar ou algo nesse sentido.
useEffect(() => {
  // Efeito colateral
});

```

---

Se este array for vazio, o efeito colateral será executado apenas uma vez, quando o componente for montado.

```TSX

// Quando utilizado dessa maneira ele executa apenas uma vez, quando o componente é montado.
useEffect(() => {
  // Efeito colateral
}, []);

```

---

Se este array for preenchido com variáveis, o efeito colateral será executado sempre que uma das variáveis for alterada. Se este array não for passado, o efeito colateral será executado sempre que o componente for renderizado.

```TSX

// Quando utilizado dessa maneira ele executa sempre que uma das variáveis for alterada.
useEffect(() => {
  // Efeito colateral
}, [variavel1, variavel2]);

```

## Cleanup functions

São funções normalmente usadas em hook que envolvem efeitos colaterais, como o useEffect. Elas são utilizadas para limpar efeitos colaterais que foram executados anteriormente. Por exemplo, se um efeito colateral foi executado e ele criou um evento, a cleanup function será responsável por remover esse evento. Um exemplo prático seria adicionar um listener via useEffect, mas, para evitar o acúmulo de vários listeners, deve-se usar uma clenaup function para remover o listener anterior.

---

O React entende uma cleanup function aquela que é retornada dentro do useEffect:

```TSX

// Neste caso não é necessário utilizar a cleanup function, pois o efeito colateral não cria nada que precise ser removido.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    return () => { // cleanup function
      console.log("Cleanup");
    };
  }, [theme]);

```

## Lidando com formulários, eventos e inputs

Cada ação do usuário na página é entendida pelo navegador como um evento. Então, eventos vão desde um click num botão até um envio de formulário. O tratamento de eventos no react é parecido com o javascript puro, mas possui suas peculiaridades. Para capturar o valor de um input de um formulário, deve-se levar em consideração os conceitos de renderização e efeitos colaterais, pois o react deve "saber"/"assistir" o que está sendo feito. Desta maneira, tem-se algumas maneiras de capturar um dado vindo de um formulário:

- Utilizando estados:
  - A cada mudança no campo do formulário, o estado é atualizado e o componente é renderizado novamente.
  - Este caso é bom para saber o que está sendo inserido em tempo real, como em validação de senhas.

```TSX
  const handleCreateTask = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(taskName);
  };

  return (
      <form onSubmit={handleCreateTask}>
        <label htmlFor="task">task:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </form>
  );
```

- Utilizando useRef:
  - Ao contrário do estado, o useRef não causa uma re-renderização do componente.
  - Ele é mais utilizado quando não é necessário saber o que está sendo inserido em tempo real, como em formulários que serão enviados de uma vez.
  - Para acessar o valor do input, deve-se acessar a propriedade `.current` do objeto retornado pelo hook `useRef`.

```TSX
  const input = useRef<HTMLInputElement>(null);
  // Note que o input não está recebendo o valor de um estado, mas sim o valor do ref.
  // Quando o form for enviado ref será preenchido com o valor do input e poderá ser acessado com input.current.value
  // Note que o atributo current se refere ao elemento HTML e não ao valor do input.
  return (
      <form onSubmit={handleCreateTask}>
        <label htmlFor="task">task:</label>
        <input
          type="text"
          ref={input}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </form>

```

---

## reducer e useReducer

Com o reducer é possível anexar um estado inicial ao hook e permite disparar ações como segundo parâmetro para alterar este estado. Um exemplo simples seria a manipulação de número:

### Utilização

- O useReducer retorna uma array, sendo o primeiro elemento o estado e o segundo uma função nomeada dispatch;
  - dispatch porque ela vai ser a responsável por delegar qual a açõ será feita, sendo essa ação responsável por mutar o estado
- O primeiro argumento passado é uma callback function com um parâmetro referenciando o estado e o segundo referenciando a ação;
- O segundo argumento a ser passado é o estado inicial da variável;

```TSX

const [number, dispatch] = useReducer((state, action) => {
  // SEMPRE deve retornar o estado
  return state;
}, 0)

```

Um padrão muito utilizado com reducer é implementar um swtich case com todas as ações que podem existir, desta maneira:

```TSX

const [number, dispatch] = useReducer((state, action) => {
  switch (action) {
    case "açãoDeIncremento":
      return state + 1;
    case "açãoDeDecremento":
      return state - 1;
    case "qualquerOutraCoisa":
      return (state = 0);
  }
  // SEMPRE deve retornar o estado
  return state;
}, 0);


// Utilização:

<button
  onClick={() => dispatch("açãoDeDecremento")}
>
  incrementar
</button>

```

### Tornando mais complexo

Tratando de objetos com useReducer:

```TSX

type actionType = {
  type: string;
  payload?: number;
};

const [number, dispatch] = useReducer(
  (state, action: actionType) => {
    switch (action.type) {
      case "incrementaMais10":
        // Sempre deve retornar state!
        if (!action.payload) return state;
        return {
          ...state,
          secondsRemaining: state.secondsRemaining + action.payload,
        };
    }
    // SEMPRE deve retornar o estado
    return state;
  },
  {
    secondsRemaining: 0,
  },
);

return (
  <TaskContext.Provider value={{ state, setState }}>
      <h1>Número: {JSON.stringify(number)} </h1>
    <button
      onClick={() => {
        dispatch({ type: "incrementaMais10", payload: 10 });
      }}
    >
      incrementar
    </button>
  </TaskContext.Provider>
);

```

## Web Workers

Web workers funcionam de maneira assíncrona em conjunto com o navegador, ou seja, fazem uma atividade ao mesmo tempo que o navegador faz outra atividade. Eles servem para realizar processos em segundo plano, nesta aplicação utilizaremos para gerenciar o timer.

### Funcionamento/Sintaxe

Ele é simples de ser utilizado, basta pensar que um manda uma mensagem, pode ser o worker ou o destinatário, e, quando essa mensagem é recebida, eles podem disparar algo em troca.

``` TSX
// timerWorker.js

self.onmessage = function (event) {
  console.log('worker recebeu:', event.data);

  // envia uma mensagem
  self.postMessage('mensagem enviada pelo worker!');

};

```

``` TSX
// TimerComponent.tsx

  const handleCreateTask = (event: React.SubmitEvent<HTMLFormElement>) => {
    const worker = new Worker(
      new URL("../../workers/timerWorker.js", import.meta.url),
    );

    worker.postMessage("mensagem enviada pelo componente.");

    // disparo de função ao receber mensagem de worker
    worker.onmessage = function (event) {
      console.log("principal recebeu", event.data);
    };
  };

```
