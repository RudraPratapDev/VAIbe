import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({ title, description, image="/empty.svg" }: Props) => {

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10">
      <Image src={image} alt="empty" width={240} height={240} className="mb-6" />

      <div className="max-w-md text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
