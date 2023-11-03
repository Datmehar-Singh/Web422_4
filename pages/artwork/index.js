import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Pagination, Row, Col, Card } from 'react-bootstrap';
import Error from 'next/error';
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE = 12;

const Artwork = () => {
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList !== null && artworkList.length > 0) {
    return (
      <>
        <Row className="gy-4 my-4">
          {artworkList.length > 0
            ? artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID} className=''>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))
            : null}
        </Row>
        {artworkList.length > 0 && (
          <Row>
            <Col className="text-center">
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  }

  return (
    <Card>
      <Card.Body>
        <h4>Nothing Here</h4>
        Try searching for something else.
      </Card.Body>
    </Card>
  );
};

export default Artwork;
