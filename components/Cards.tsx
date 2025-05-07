export function ResourceCard({
    title,
    description,
    href,
  }: {
    title: string;
    description: string;
    href: string;
  }) {
    return (
      <div className="flex flex-col gap-2 auto border rounded-md p-4">
        <a href={href} className="text-sm underline hover:no-underline">
          {title}
        </a>
        <p className="text-xs">{description}</p>
      </div>
    );
  }
  