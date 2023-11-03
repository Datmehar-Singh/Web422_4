import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';
import { useRouter } from 'next/router';
const ArtworkDetailPage = () => {
    const router = useRouter();
    const { objectID } = router.query;
  
    return (
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    );
  };
  
  export default ArtworkDetailPage;
  