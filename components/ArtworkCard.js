import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const {  objectDate, classification, medium } = data;

    const cardText = `${objectDate || 'N/A'}, ${classification || 'N/A'}, ${medium || 'N/A'}`;

    return (
      <Card className='h-100'>
        <Card.Img variant="top" src={data?.primaryImageSmall||'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />
        <Card.Body>
          <Card.Title>{data?.title||'N/A'}</Card.Title>
          <Card.Text>{cardText}</Card.Text>
          <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="primary">{objectID}</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return null;
};

export default ArtworkCard;
