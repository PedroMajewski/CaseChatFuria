export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string; // Simple date string for now
  link?: string; // Optional link to full article
}

// Mock news data
const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'FURIA Secures Spot in Major Playoffs!',
    summary: 'After a thrilling series against Team Liquid, FURIA advances to the playoff stage of the IEM Rio Major.',
    date: '2024-10-28',
    link: '#',
  },
  {
    id: 'news-2',
    title: 'arT Joins FURIA Roster',
    summary: 'The legendary AWPer arT has officially signed with FURIA, bringing his aggressive playstyle to the team.',
    date: '2024-09-15',
    link: '#',
  },
  {
    id: 'news-3',
    title: 'Upcoming Match: FURIA vs. NAVI',
    summary: 'Don\'t miss the clash of titans as FURIA takes on NAVI in the BLAST Premier Group Stage.',
    date: '2024-11-05',
  },
   {
    id: 'news-4',
    title: 'KSCERATO Voted MVP of ESL Pro League',
    summary: 'KSCERATO\'s consistent performance earns him the MVP title for the latest season of ESL Pro League.',
    date: '2024-08-20',
    link: '#',
  },
];

/**
 * Asynchronously retrieves news items.
 * In a real application, this would fetch data from a CMS or API.
 *
 * @returns A promise that resolves to an array of NewsItem objects.
 */
export async function getNews(): Promise<NewsItem[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockNews;
}
