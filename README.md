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

```tsx
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
