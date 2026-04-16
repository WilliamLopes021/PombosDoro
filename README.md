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
