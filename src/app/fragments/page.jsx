import Fragments from '../../components/fragments/Fragments';
import { photos } from '../../data/photos';

export const metadata = {
  title: 'Fragments — Sherlock Dong',
  description: 'Places I’ve been. Things I’ve seen. A collection of photographs to get lost in.',
};

export default function FragmentsPage() {
  return <Fragments photos={photos} />;
}
