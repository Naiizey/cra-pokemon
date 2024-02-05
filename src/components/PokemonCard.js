import './PokemonCard.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const PokemonCard = ({ name, image = '', apiTypes = [] }) => {
  const [selected, setSetselected] = useState(false);

  return (
    <div
      className={`PokemonCard ${selected ? 'selected' : ''}`}
      onClick={() => setSetselected(!selected)}
    >
      <img className="PokemonCard-image" alt="" src={image} />
      <h6 className="PokemonCard-name">{name}</h6>
      <div className="PokemonCard-types">
        {apiTypes.map((type) => (
          <div key={type.name} className="PokemonCard-type">
            <img alt="" src={type.image} />
            <span>{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  apiTypes: PropTypes.array,
};

export default PokemonCard;
