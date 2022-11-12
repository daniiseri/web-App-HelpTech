interface FooterProps {
  children: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <div className="bg-gray-900 flex flex-wrap justify-around">{children}</div>
  );
}
