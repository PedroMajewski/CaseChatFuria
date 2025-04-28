'use client'; // Required for useEffect and useState

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsItem } from '@/services/news';
import { getNews } from '@/services/news';
import Link from 'next/link';
import { Newspaper } from 'lucide-react'; // Icon for news

const NewsFeed: FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await getNews();
        setNewsItems(news);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Could not load news feed.");
        setNewsItems([]); // Clear news on error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Fetch only once on component mount

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-8 w-24 mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

   if (error) {
    return (
      <Card className="border-destructive shadow-lg">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2"><Newspaper className="h-5 w-5" /> News Feed Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
         <Newspaper className="h-6 w-6" /> Latest News & Updates
       </h2>
      {newsItems.length === 0 && !loading && <p>No news available at the moment.</p>}
      {newsItems.map((item) => (
        <Card key={item.id} className="shadow-lg bg-card/80 backdrop-blur hover:bg-card/90 transition-colors duration-200">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{item.summary}</p>
            {item.link && (
              <Button asChild variant="outline" size="sm">
                <Link href={item.link}>Read More</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsFeed;
