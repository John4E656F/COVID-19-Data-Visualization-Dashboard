import type { PropsWithChildrenOptional } from '@/types';

type CardProps = { className?: string } & PropsWithChildrenOptional;

export function Card({ children, className }: CardProps) {
  return <article className={`${className}  rounded drop-shadow-lg p-2`}>{children}</article>;
}
