interface ImageCardProps {
  src: string;
}

export function ImageCard({ src }: ImageCardProps) {
  return <img src={src} className="flex-1 h-12 rounded" />;
}
