import { Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';


import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ArtworkDetailsCard = ({ objectID }) => {
  
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
        fetcher
      );
    
      if (error) {
        return <Error statusCode={404} />;
      }

    if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  const imageUrl = primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  const cardTitle = title || 'N/A';
  const cardText = `${objectDate || 'N/A'}, ${classification || 'N/A'}, ${medium || 'N/A'}`;
  const artistLink = artistDisplayName ? (
    <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
      wiki
    </a>
  ) : null;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <br />
        <br />
        <p>
          {artistDisplayName || 'N/A'} {artistLink}
        </p>
        <p>{creditLine || 'N/A'}</p>
        <p>{dimensions || 'N/A'}</p>
      </Card.Body>
    </Card>
  );
};

export default ArtworkDetailsCard;
