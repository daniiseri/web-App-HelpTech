import { Card } from "../../../components/Card";
import { ImageCard } from "../../../components/ImageCard";
import { Text } from "../../../components/Text";

import { ImPriceTags } from "react-icons/im";

import { Field } from "../../../components/Field";

export interface HardwareProps {
  description: string;
  price: number;
  img: string;
  link: string;
}

export function HardwareCard(props: HardwareProps) {
  return (
    <Card>
      <ImageCard src={props.img} />
      <a href={props.link} target={"_blank"}>
        <Text>
          <p className="hover:text-bronw-500">{props.description}</p>
        </Text>
      </a>

      <Field>
        <ImPriceTags className="text-bronw-100" />
        <Text>
          <p>R$ {props.price}</p>
        </Text>
      </Field>
    </Card>
  );
}
