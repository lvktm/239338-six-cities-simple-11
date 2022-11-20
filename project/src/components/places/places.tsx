import { useState } from 'react';

import { Offers } from '../../types/offers';
import { Location } from '../../types/location';
import { pluralize } from '../../utils';

import PlaceCard from '../place-card/place-card';
import Map from '../map/map';


type PlacesProps = {
  currentCity: {
    location: Location;
    name: string;
  };
  offers: Offers;
}


const Places = (props: PlacesProps): JSX.Element => {
  const { currentCity, offers } = props;
  const [ selectedPlaceID, setSelectedPlaceID ] = useState<number | undefined>(undefined);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>

        <b className="places__found">{ pluralize(offers.length, 'place') } to stay in { currentCity.name }</b>

        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by </span>

          <span className="places__sorting-type" tabIndex={ 0 }>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>

          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={ 0 }>Popular</li>
            <li className="places__option" tabIndex={ 0 }>Price: low to high</li>
            <li className="places__option" tabIndex={ 0 }>Price: high to low</li>
            <li className="places__option" tabIndex={ 0 }>Top rated first</li>
          </ul>
        </form>

        <div className="cities__places-list places__list tabs__content">
          {
            offers.map((offer) => (
              <PlaceCard
                key= { offer.id }
                parentClass= 'cities'
                place= { offer }
                setSelectedPlaceID= { setSelectedPlaceID }
              />
            ))
          }
        </div>
      </section>

      <div className="cities__right-section">
        <Map
          location={ currentCity.location }
          offers={ offers }
          selectedPlaceID= { selectedPlaceID }
          parentClass='cities'
        />
      </div>
    </>
  );
};


export default Places;