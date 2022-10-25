import { Section } from "../../../components/Section";
import { Text } from "../../../components/Text";

export function Motivation() {
  function redirect() {
    window.open(
      "https://www.tecmundo.com.br/produto/177379-escolher-desktop-ideal-empresa.htm"
    );
  }

  return (
    <Section title="Motivação">
      <blockquote>
        <Text>
          <p>
            A compra de um novo computador não é uma decisão fácil de ser
            tomada. Afinal, são tantas variáveis envolvidas que pode ser
            realmente difícil fazer a escolha acertada para determinada
            situação.
          </p>
          <cite
            className="hover:cursor-pointer hover:text-bronw-500"
            onClick={redirect}
          >
            Saiba mais...
          </cite>
        </Text>
      </blockquote>
    </Section>
  );
}
