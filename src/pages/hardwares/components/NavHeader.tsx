import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Text } from "../../../components/Text";

import { useCheck } from "../../../context/Check";

import { IoHardwareChipSharp } from "react-icons/io5";
import { AiOutlineDesktop } from "react-icons/ai";

import { Field } from "../../../components/Field";

export function NavHeader() {
  const { response } = useCheck();

  return (
    <NavigationMenu.Root className="w-full">
      <NavigationMenu.List className="flex-1 flex justify-around px-4 py-3 bg-gray-800 rounded">
        <NavigationMenu.Item className="">
          <NavigationMenu.Trigger>
            <Field>
              <IoHardwareChipSharp className="text-bronw-100" />
              <Text>Components</Text>
            </Field>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className=" bg-gray-800 relative rounded top-1 px-4 py-3">
            <NavigationMenu.List className="flex flex-col flex-wrap gap-4 justify-around">
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/memory">
                  <Text>Memória</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/hard-disc">
                  <Text>Disco rígido</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/processor">
                  <Text>Processador</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/cooler">
                  <Text>Cooler</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link href="/motherboard">
                  <Text>Placa mãe</Text>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              {response > 2 && (
                <NavigationMenu.Item>
                  <NavigationMenu.Link href="/video-card">
                    <Text>Placa de vídeo</Text>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              )}
            </NavigationMenu.List>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="/desktop">
            <Field>
              <AiOutlineDesktop className="text-bronw-100" />
              <Text>Desktop</Text>
            </Field>
          </NavigationMenu.Link>
          <NavigationMenu.Content></NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator />
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
