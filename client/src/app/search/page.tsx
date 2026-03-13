import SearchPageClient from './SearchPageClient';

export const dynamic = 'force-dynamic';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  return <SearchPageClient keyword={searchParams.keyword || ''} />;
}