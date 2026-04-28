import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | DOCTORcheap',
  description: 'Learn about our mission, our story, and how we are transforming accessible healthcare.',
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}