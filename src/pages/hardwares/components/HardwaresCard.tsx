import { Card } from "../../../components/Card";
import { ImageCard } from "../../../components/ImageCard";
import { Text } from "../../../components/Text";

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
      <Text>
        <p>R$ {props.price}</p>
      </Text>
    </Card>
  );
}
