# Component Card

|Propriedade  | Tipo       | Opcional | Descrição |
|-------------|------------|----------|---------- |
|title        | string     | _true_   | título a ser exibido no card        |
|image        | string     | _false_  | imagem a ser exibida no background do card |

---

## Exemplo de implementação do Card

Importe em seu arquivo `.ts` ou `.tsx`
```typescript
import { Card } from '../../src/components/Card';
const card ={
  title: 'Nome do card',
  image: 'https://cdn.pixabay.com/photo/2020/03/09/17/51/narcis-4916584_960_720.jpg'
}
```

Adicione o componente no retorno a ser renderizado
```html
<Card
  title={"card.title"}
  image={"card.image"}
/>
```