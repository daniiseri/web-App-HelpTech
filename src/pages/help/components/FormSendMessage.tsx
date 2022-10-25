import { Form } from "../../../components/Form";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { TextArea } from "../../../components/TextArea";

export function FormSendMessage() {
  return (
    <Form
      action="https://formsubmit.co/danielsi-2015@hotmail.com"
      method="POST"
    >
      <Input
        type="hidden"
        name="_next"
        value="https://yourdomain.co/thanks.html"
      />
      <Input type="hidden" name="_captcha" value="false" />
      <Input type="text" name="name" placeholder="Digite seu nome" required />
      <Input
        type="email"
        name="email"
        placeholder="Digite ser email"
        required
      />
      <Input name="_subject" required placeholder="Assunto" />
      <TextArea required name="message" placeholder="Mensagem" />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
