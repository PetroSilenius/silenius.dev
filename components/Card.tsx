import Link from 'next/link'

interface CardProps {
  href: string
  children: JSX.Element | JSX.Element[]
}

export const Card = ({ href, children }: CardProps): JSX.Element => {
  return (
    <>
      <Link href={href}>
        <a className="card">{children}</a>
      </Link>
      <style jsx>
        {`
          .card {
            margin: 1rem;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
            width: 45%;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: var(--link);
            border-color: var(--link);
          }

          .card h2 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }

          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </>
  )
}
