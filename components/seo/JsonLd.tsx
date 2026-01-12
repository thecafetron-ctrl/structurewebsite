export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD doesn't render UI; safe for SEO and won't change visuals.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}


